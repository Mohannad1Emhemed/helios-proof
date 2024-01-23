'use strict';

var redent = require('redent');
var isEqual = require('lodash/isEqual.js');
var cssTools = require('@adobe/css-tools');
var domAccessibilityApi = require('dom-accessibility-api');
var chalk = require('chalk');
var isEqualWith = require('lodash/isEqualWith.js');
var uniq = require('lodash/uniq.js');
var escape = require('css.escape');
var ariaQuery = require('aria-query');

class GenericTypeError extends Error {
  constructor(expectedString, received, matcherFn, context) {
    super();

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = '';
    try {
      withType = context.utils.printWithType(
        'Received',
        received,
        context.utils.printReceived,
      );
    } catch (e) {
      // Can throw for Document:
      // https://github.com/jsdom/jsdom/issues/2304
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? '.not' : ''}.${matcherFn.name}`,
        'received',
        '',
      ),
      '',
      // eslint-disable-next-line new-cap
      `${context.utils.RECEIVED_COLOR(
        'received',
      )} value must ${expectedString}.`,
      withType,
    ].join('\n');
  }
}

class HtmlElementTypeError extends GenericTypeError {
  constructor(...args) {
    super('be an HTMLElement or an SVGElement', ...args);
  }
}

class NodeTypeError extends GenericTypeError {
  constructor(...args) {
    super('be a Node', ...args);
  }
}

function checkHasWindow(htmlElement, ErrorClass, ...args) {
  if (
    !htmlElement ||
    !htmlElement.ownerDocument ||
    !htmlElement.ownerDocument.defaultView
  ) {
    throw new ErrorClass(htmlElement, ...args)
  }
}

function checkNode(node, ...args) {
  checkHasWindow(node, NodeTypeError, ...args);
  const window = node.ownerDocument.defaultView;

  if (!(node instanceof window.Node)) {
    throw new NodeTypeError(node, ...args)
  }
}

function checkHtmlElement(htmlElement, ...args) {
  checkHasWindow(htmlElement, HtmlElementTypeError, ...args);
  const window = htmlElement.ownerDocument.defaultView;

  if (
    !(htmlElement instanceof window.HTMLElement) &&
    !(htmlElement instanceof window.SVGElement)
  ) {
    throw new HtmlElementTypeError(htmlElement, ...args)
  }
}

class InvalidCSSError extends Error {
  constructor(received, matcherFn, context) {
    super();

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    this.message = [
      received.message,
      '',
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`Failing css:`),
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`${received.css}`),
    ].join('\n');
  }
}

function parseCSS(css, ...args) {
  const ast = cssTools.parse(`selector { ${css} }`, {silent: true}).stylesheet;

  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    const {reason, line} = ast.parsingErrors[0];

    throw new InvalidCSSError(
      {
        css,
        message: `Syntax error parsing expected css: ${reason} on line: ${line}`,
      },
      ...args,
    )
  }

  const parsedRules = ast.rules[0].declarations
    .filter(d => d.type === 'declaration')
    .reduce(
      (obj, {property, value}) => Object.assign(obj, {[property]: value}),
      {},
    );
  return parsedRules
}

function display(context, value) {
  return typeof value === 'string' ? value : context.utils.stringify(value)
}

function getMessage(
  context,
  matcher,
  expectedLabel,
  expectedValue,
  receivedLabel,
  receivedValue,
) {
  return [
    `${matcher}\n`,
    // eslint-disable-next-line new-cap
    `${expectedLabel}:\n${context.utils.EXPECTED_COLOR(
      redent(display(context, expectedValue), 2),
    )}`,
    // eslint-disable-next-line new-cap
    `${receivedLabel}:\n${context.utils.RECEIVED_COLOR(
      redent(display(context, receivedValue), 2),
    )}`,
  ].join('\n')
}

function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch)
  } else {
    return textToMatch.includes(String(matcher))
  }
}

function deprecate(name, replacementText) {
  // Notify user that they are using deprecated functionality.
  // eslint-disable-next-line no-console
  console.warn(
    `Warning: ${name} has been deprecated and will be removed in future updates.`,
    replacementText,
  );
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function getTag(element) {
  return element.tagName && element.tagName.toLowerCase()
}

function getSelectValue({multiple, options}) {
  const selectedOptions = [...options].filter(option => option.selected);

  if (multiple) {
    return [...selectedOptions].map(opt => opt.value)
  }
  /* istanbul ignore if */
  if (selectedOptions.length === 0) {
    return undefined // Couldn't make this happen, but just in case
  }
  return selectedOptions[0].value
}

function getInputValue(inputElement) {
  switch (inputElement.type) {
    case 'number':
      return inputElement.value === '' ? null : Number(inputElement.value)
    case 'checkbox':
      return inputElement.checked
    default:
      return inputElement.value
  }
}

function getSingleElementValue(element) {
  /* istanbul ignore if */
  if (!element) {
    return undefined
  }
  switch (element.tagName.toLowerCase()) {
    case 'input':
      return getInputValue(element)
    case 'select':
      return getSelectValue(element)
    default:
      return element.value
  }
}

function compareArraysAsSet(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isEqual(new Set(a), new Set(b))
  }
  return undefined
}

function toSentence(
  array,
  {wordConnector = ', ', lastWordConnector = ' and '} = {},
) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : '',
  )
}

function toBeInTheDOM(element, container) {
  deprecate(
    'toBeInTheDOM',
    'Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container.',
  );

  if (element) {
    checkHtmlElement(element, toBeInTheDOM, this);
  }

  if (container) {
    checkHtmlElement(container, toBeInTheDOM, this);
  }

  return {
    pass: container ? container.contains(element) : !!element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeInTheDOM`,
          'element',
          '',
        ),
        '',
        'Received:',
        `  ${this.utils.printReceived(
          element ? element.cloneNode(false) : element,
        )}`,
      ].join('\n')
    },
  }
}

function toBeInTheDocument(element) {
  if (element !== null || !this.isNot) {
    checkHtmlElement(element, toBeInTheDocument, this);
  }

  const pass =
    element === null
      ? false
      : element.ownerDocument === element.getRootNode({composed: true});

  const errorFound = () => {
    return `expected document not to contain element, found ${this.utils.stringify(
      element.cloneNode(true),
    )} instead`
  };
  const errorNotFound = () => {
    return `element could not be found in the document`
  };

  return {
    pass,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeInTheDocument`,
          'element',
          '',
        ),
        '',
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound()),
      ].join('\n')
    },
  }
}

function toBeEmpty(element) {
  deprecate(
    'toBeEmpty',
    'Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM.',
  );
  checkHtmlElement(element, toBeEmpty, this);

  return {
    pass: element.innerHTML === '',
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeEmpty`,
          'element',
          '',
        ),
        '',
        'Received:',
        `  ${this.utils.printReceived(element.innerHTML)}`,
      ].join('\n')
    },
  }
}

function toBeEmptyDOMElement(element) {
  checkHtmlElement(element, toBeEmptyDOMElement, this);

  return {
    pass: isEmptyElement(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeEmptyDOMElement`,
          'element',
          '',
        ),
        '',
        'Received:',
        `  ${this.utils.printReceived(element.innerHTML)}`,
      ].join('\n')
    },
  }
}

/**
 * Identifies if an element doesn't contain child nodes (excluding comments)
 * ℹ Node.COMMENT_NODE can't be used because of the following issue 
 * https://github.com/jsdom/jsdom/issues/2220
 *
 * @param {*} element an HtmlElement or SVGElement
 * @return {*} true if the element only contains comments or none
 */
function isEmptyElement(element){
  const nonCommentChildNodes = [...element.childNodes].filter(node => node.nodeType !== 8);
  return nonCommentChildNodes.length === 0;
}

function toContainElement(container, element) {
  checkHtmlElement(container, toContainElement, this);

  if (element !== null) {
    checkHtmlElement(element, toContainElement, this);
  }

  return {
    pass: container.contains(element),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toContainElement`,
          'element',
          'element',
        ),
        '',
        // eslint-disable-next-line new-cap
        this.utils.RECEIVED_COLOR(`${this.utils.stringify(
          container.cloneNode(false),
        )} ${
          this.isNot ? 'contains:' : 'does not contain:'
        } ${this.utils.stringify(element ? element.cloneNode(false) : element)}
        `),
      ].join('\n')
    },
  }
}

function getNormalizedHtml(container, htmlText) {
  const div = container.ownerDocument.createElement('div');
  div.innerHTML = htmlText;
  return div.innerHTML
}

function toContainHTML(container, htmlText) {
  checkHtmlElement(container, toContainHTML, this);

  if (typeof htmlText !== 'string') {
    throw new Error(`.toContainHTML() expects a string value, got ${htmlText}`)
  }

  return {
    pass: container.outerHTML.includes(getNormalizedHtml(container, htmlText)),
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toContainHTML`,
          'element',
          '',
        ),
        'Expected:',
        // eslint-disable-next-line new-cap
        `  ${this.utils.EXPECTED_COLOR(htmlText)}`,
        'Received:',
        `  ${this.utils.printReceived(container.cloneNode(true))}`,
      ].join('\n')
    },
  }
}

function toHaveTextContent(
  node,
  checkWith,
  options = {normalizeWhitespace: true},
) {
  checkNode(node, toHaveTextContent, this);

  const textContent = options.normalizeWhitespace
    ? normalize(node.textContent)
    : node.textContent.replace(/\u00a0/g, ' '); // Replace &nbsp; with normal spaces

  const checkingWithEmptyString = textContent !== '' && checkWith === '';

  return {
    pass: !checkingWithEmptyString && matches(textContent, checkWith),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveTextContent`,
          'element',
          '',
        ),
        checkingWithEmptyString
          ? `Checking with empty string will always match, use .toBeEmptyDOMElement() instead`
          : `Expected element ${to} have text content`,
        checkWith,
        'Received',
        textContent,
      )
    },
  }
}

function toHaveAccessibleDescription(
  htmlElement,
  expectedAccessibleDescription,
) {
  checkHtmlElement(htmlElement, toHaveAccessibleDescription, this);
  const actualAccessibleDescription = domAccessibilityApi.computeAccessibleDescription(htmlElement);
  const missingExpectedValue = arguments.length === 1;

  let pass = false;
  if (missingExpectedValue) {
    // When called without an expected value we only want to validate that the element has an
    // accessible description, whatever it may be.
    pass = actualAccessibleDescription !== '';
  } else {
    pass =
      expectedAccessibleDescription instanceof RegExp
        ? expectedAccessibleDescription.test(actualAccessibleDescription)
        : this.equals(
            actualAccessibleDescription,
            expectedAccessibleDescription,
          );
  }

  return {
    pass,

    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.${toHaveAccessibleDescription.name}`,
          'element',
          '',
        ),
        `Expected element ${to} have accessible description`,
        expectedAccessibleDescription,
        'Received',
        actualAccessibleDescription,
      )
    },
  }
}

const ariaInvalidName = 'aria-invalid';
const validStates = ['false'];

// See `aria-errormessage` spec at https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
function toHaveAccessibleErrorMessage(
  htmlElement,
  expectedAccessibleErrorMessage,
) {
  checkHtmlElement(htmlElement, toHaveAccessibleErrorMessage, this);
  const to = this.isNot ? 'not to' : 'to';
  const method = this.isNot
    ? '.not.toHaveAccessibleErrorMessage'
    : '.toHaveAccessibleErrorMessage';

  // Enforce Valid Id
  const errormessageId = htmlElement.getAttribute('aria-errormessage');
  const errormessageIdInvalid = !!errormessageId && /\s+/.test(errormessageId);

  if (errormessageIdInvalid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, 'element'),
          "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID",
          '',
          'Received',
          `aria-errormessage="${errormessageId}"`,
        )
      },
    }
  }

  // See `aria-invalid` spec at https://www.w3.org/TR/wai-aria-1.2/#aria-invalid
  const ariaInvalidVal = htmlElement.getAttribute(ariaInvalidName);
  const fieldValid =
    !htmlElement.hasAttribute(ariaInvalidName) ||
    validStates.includes(ariaInvalidVal);

  // Enforce Valid `aria-invalid` Attribute
  if (fieldValid) {
    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(method, 'element'),
          'Expected element to be marked as invalid with attribute',
          `${ariaInvalidName}="${String(true)}"`,
          'Received',
          htmlElement.hasAttribute('aria-invalid')
            ? `${ariaInvalidName}="${htmlElement.getAttribute(ariaInvalidName)}`
            : null,
        )
      },
    }
  }

  const error = normalize(
    htmlElement.ownerDocument.getElementById(errormessageId)?.textContent ?? '',
  );

  return {
    pass:
      expectedAccessibleErrorMessage === undefined
        ? Boolean(error)
        : expectedAccessibleErrorMessage instanceof RegExp
        ? expectedAccessibleErrorMessage.test(error)
        : this.equals(error, expectedAccessibleErrorMessage),

    message: () => {
      return getMessage(
        this,
        this.utils.matcherHint(method, 'element'),
        `Expected element ${to} have accessible error message`,
        expectedAccessibleErrorMessage ?? '',
        'Received',
        error,
      )
    },
  }
}

function toHaveAccessibleName(htmlElement, expectedAccessibleName) {
  checkHtmlElement(htmlElement, toHaveAccessibleName, this);
  const actualAccessibleName = domAccessibilityApi.computeAccessibleName(htmlElement);
  const missingExpectedValue = arguments.length === 1;

  let pass = false;
  if (missingExpectedValue) {
    // When called without an expected value we only want to validate that the element has an
    // accessible name, whatever it may be.
    pass = actualAccessibleName !== '';
  } else {
    pass =
      expectedAccessibleName instanceof RegExp
        ? expectedAccessibleName.test(actualAccessibleName)
        : this.equals(actualAccessibleName, expectedAccessibleName);
  }

  return {
    pass,

    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.${toHaveAccessibleName.name}`,
          'element',
          '',
        ),
        `Expected element ${to} have accessible name`,
        expectedAccessibleName,
        'Received',
        actualAccessibleName,
      )
    },
  }
}

function printAttribute(stringify, name, value) {
  return value === undefined ? name : `${name}=${stringify(value)}`
}

function getAttributeComment(stringify, name, value) {
  return value === undefined
    ? `element.hasAttribute(${stringify(name)})`
    : `element.getAttribute(${stringify(name)}) === ${stringify(value)}`
}

function toHaveAttribute(htmlElement, name, expectedValue) {
  checkHtmlElement(htmlElement, toHaveAttribute, this);
  const isExpectedValuePresent = expectedValue !== undefined;
  const hasAttribute = htmlElement.hasAttribute(name);
  const receivedValue = htmlElement.getAttribute(name);
  return {
    pass: isExpectedValuePresent
      ? hasAttribute && this.equals(receivedValue, expectedValue)
      : hasAttribute,
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const receivedAttribute = hasAttribute
        ? printAttribute(this.utils.stringify, name, receivedValue)
        : null;
      const matcher = this.utils.matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveAttribute`,
        'element',
        this.utils.printExpected(name),
        {
          secondArgument: isExpectedValuePresent
            ? this.utils.printExpected(expectedValue)
            : undefined,
          comment: getAttributeComment(
            this.utils.stringify,
            name,
            expectedValue,
          ),
        },
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have attribute`,
        printAttribute(this.utils.stringify, name, expectedValue),
        'Received',
        receivedAttribute,
      )
    },
  }
}

function getExpectedClassNamesAndOptions(params) {
  const lastParam = params.pop();
  let expectedClassNames, options;

  if (typeof lastParam === 'object') {
    expectedClassNames = params;
    options = lastParam;
  } else {
    expectedClassNames = params.concat(lastParam);
    options = {exact: false};
  }
  return {expectedClassNames, options}
}

function splitClassNames(str) {
  if (!str) {
    return []
  }
  return str.split(/\s+/).filter(s => s.length > 0)
}

function isSubset$1(subset, superset) {
  return subset.every(item => superset.includes(item))
}

function toHaveClass(htmlElement, ...params) {
  checkHtmlElement(htmlElement, toHaveClass, this);
  const {expectedClassNames, options} = getExpectedClassNamesAndOptions(params);

  const received = splitClassNames(htmlElement.getAttribute('class'));
  const expected = expectedClassNames.reduce(
    (acc, className) => acc.concat(splitClassNames(className)),
    [],
  );

  if (options.exact) {
    return {
      pass: isSubset$1(expected, received) && expected.length === received.length,
      message: () => {
        const to = this.isNot ? 'not to' : 'to';
        return getMessage(
          this,
          this.utils.matcherHint(
            `${this.isNot ? '.not' : ''}.toHaveClass`,
            'element',
            this.utils.printExpected(expected.join(' ')),
          ),
          `Expected the element ${to} have EXACTLY defined classes`,
          expected.join(' '),
          'Received',
          received.join(' '),
        )
      },
    }
  }

  return expected.length > 0
    ? {
        pass: isSubset$1(expected, received),
        message: () => {
          const to = this.isNot ? 'not to' : 'to';
          return getMessage(
            this,
            this.utils.matcherHint(
              `${this.isNot ? '.not' : ''}.toHaveClass`,
              'element',
              this.utils.printExpected(expected.join(' ')),
            ),
            `Expected the element ${to} have class`,
            expected.join(' '),
            'Received',
            received.join(' '),
          )
        },
      }
    : {
        pass: this.isNot ? received.length > 0 : false,
        message: () =>
          this.isNot
            ? getMessage(
                this,
                this.utils.matcherHint('.not.toHaveClass', 'element', ''),
                'Expected the element to have classes',
                '(none)',
                'Received',
                received.join(' '),
              )
            : [
                this.utils.matcherHint(`.toHaveClass`, 'element'),
                'At least one expected class must be provided.',
              ].join('\n'),
      }
}

function getStyleDeclaration(document, css) {
  const styles = {};

  // The next block is necessary to normalize colors
  const copy = document.createElement('div');
  Object.keys(css).forEach(property => {
    copy.style[property] = css[property];
    styles[property] = copy.style[property];
  });

  return styles
}

function isSubset(styles, computedStyle) {
  return (
    !!Object.keys(styles).length &&
    Object.entries(styles).every(([prop, value]) => {
      const isCustomProperty = prop.startsWith('--');
      const spellingVariants = [prop];
      if (!isCustomProperty) spellingVariants.push(prop.toLowerCase());

      return spellingVariants.some(
        name =>
          computedStyle[name] === value ||
          computedStyle.getPropertyValue(name) === value,
      )
    })
  )
}

function printoutStyles(styles) {
  return Object.keys(styles)
    .sort()
    .map(prop => `${prop}: ${styles[prop]};`)
    .join('\n')
}

// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(diffFn, expected, computedStyles) {
  const received = Array.from(computedStyles)
    .filter(prop => expected[prop] !== undefined)
    .reduce(
      (obj, prop) =>
        Object.assign(obj, {[prop]: computedStyles.getPropertyValue(prop)}),
      {},
    );
  const diffOutput = diffFn(printoutStyles(expected), printoutStyles(received));
  // Remove the "+ Received" annotation because this is a one-way diff
  return diffOutput.replace(`${chalk.red('+ Received')}\n`, '')
}

function toHaveStyle(htmlElement, css) {
  checkHtmlElement(htmlElement, toHaveStyle, this);
  const parsedCSS =
    typeof css === 'object' ? css : parseCSS(css, toHaveStyle, this);
  const {getComputedStyle} = htmlElement.ownerDocument.defaultView;

  const expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS);
  const received = getComputedStyle(htmlElement);

  return {
    pass: isSubset(expected, received),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`;
      return [
        this.utils.matcherHint(matcher, 'element', ''),
        expectedDiff(this.utils.diff, expected, received),
      ].join('\n\n')
    },
  }
}

function toHaveFocus(element) {
  checkHtmlElement(element, toHaveFocus, this);

  return {
    pass: element.ownerDocument.activeElement === element,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveFocus`,
          'element',
          '',
        ),
        '',
        ...(this.isNot
          ? [
              'Received element is focused:',
              `  ${this.utils.printReceived(element)}`,
            ]
          : [
              'Expected element with focus:',
              `  ${this.utils.printExpected(element)}`,
              'Received element with focus:',
              `  ${this.utils.printReceived(
                element.ownerDocument.activeElement,
              )}`,
            ]),
      ].join('\n')
    },
  }
}

// Returns the combined value of several elements that have the same name
// e.g. radio buttons or groups of checkboxes
function getMultiElementValue(elements) {
  const types = uniq(elements.map(element => element.type));
  if (types.length !== 1) {
    throw new Error(
      'Multiple form elements with the same name must be of the same type',
    )
  }
  switch (types[0]) {
    case 'radio': {
      const theChosenOne = elements.find(radio => radio.checked);
      return theChosenOne ? theChosenOne.value : undefined
    }
    case 'checkbox':
      return elements
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value)
    default:
      // NOTE: Not even sure this is a valid use case, but just in case...
      return elements.map(element => element.value)
  }
}

function getFormValue(container, name) {
  const elements = [...container.querySelectorAll(`[name="${escape(name)}"]`)];
  /* istanbul ignore if */
  if (elements.length === 0) {
    return undefined // shouldn't happen, but just in case
  }
  switch (elements.length) {
    case 1:
      return getSingleElementValue(elements[0])
    default:
      return getMultiElementValue(elements)
  }
}

// Strips the `[]` suffix off a form value name
function getPureName(name) {
  return /\[\]$/.test(name) ? name.slice(0, -2) : name
}

function getAllFormValues(container) {
  const names = Array.from(container.elements).map(element => element.name);
  return names.reduce(
    (obj, name) => ({
      ...obj,
      [getPureName(name)]: getFormValue(container, name),
    }),
    {},
  )
}

function toHaveFormValues(formElement, expectedValues) {
  checkHtmlElement(formElement, toHaveFormValues, this);
  if (!formElement.elements) {
    // TODO: Change condition to use instanceof against the appropriate element classes instead
    throw new Error('toHaveFormValues must be called on a form or a fieldset')
  }
  const formValues = getAllFormValues(formElement);
  return {
    pass: Object.entries(expectedValues).every(([name, expectedValue]) =>
      isEqualWith(formValues[name], expectedValue, compareArraysAsSet),
    ),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const matcher = `${this.isNot ? '.not' : ''}.toHaveFormValues`;
      const commonKeyValues = Object.keys(formValues)
        .filter(key => expectedValues.hasOwnProperty(key))
        .reduce((obj, key) => ({...obj, [key]: formValues[key]}), {});
      return [
        this.utils.matcherHint(matcher, 'element', ''),
        `Expected the element ${to} have form values`,
        this.utils.diff(expectedValues, commonKeyValues),
      ].join('\n\n')
    },
  }
}

function isStyleVisible(element) {
  const {getComputedStyle} = element.ownerDocument.defaultView;

  const {display, visibility, opacity} = getComputedStyle(element);
  return (
    display !== 'none' &&
    visibility !== 'hidden' &&
    visibility !== 'collapse' &&
    opacity !== '0' &&
    opacity !== 0
  )
}

function isAttributeVisible(element, previousElement) {
  let detailsVisibility;

  if (previousElement) {
    detailsVisibility =
      element.nodeName === 'DETAILS' && previousElement.nodeName !== 'SUMMARY'
        ? element.hasAttribute('open')
        : true;
  } else {
    detailsVisibility =
      element.nodeName === 'DETAILS' ? element.hasAttribute('open') : true;
  }

  return !element.hasAttribute('hidden') && detailsVisibility
}

function isElementVisible(element, previousElement) {
  return (
    isStyleVisible(element) &&
    isAttributeVisible(element, previousElement) &&
    (!element.parentElement || isElementVisible(element.parentElement, element))
  )
}

function toBeVisible(element) {
  checkHtmlElement(element, toBeVisible, this);
  const isInDocument =
    element.ownerDocument === element.getRootNode({composed: true});
  const isVisible = isInDocument && isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeVisible`,
          'element',
          '',
        ),
        '',
        `Received element ${is} visible${
          isInDocument ? '' : ' (element is not in the document)'
        }:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

// form elements that support 'disabled'
const FORM_TAGS$2 = [
  'fieldset',
  'input',
  'select',
  'optgroup',
  'option',
  'button',
  'textarea',
];

/*
 * According to specification:
 * If <fieldset> is disabled, the form controls that are its descendants,
 * except descendants of its first optional <legend> element, are disabled
 *
 * https://html.spec.whatwg.org/multipage/form-elements.html#concept-fieldset-disabled
 *
 * This method tests whether element is first legend child of fieldset parent
 */
function isFirstLegendChildOfFieldset(element, parent) {
  return (
    getTag(element) === 'legend' &&
    getTag(parent) === 'fieldset' &&
    element.isSameNode(
      Array.from(parent.children).find(child => getTag(child) === 'legend'),
    )
  )
}

function isElementDisabledByParent(element, parent) {
  return (
    isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent)
  )
}

function isCustomElement(tag) {
  return tag.includes('-')
}

/*
 * Only certain form elements and custom elements can actually be disabled:
 * https://html.spec.whatwg.org/multipage/semantics-other.html#disabled-elements
 */
function canElementBeDisabled(element) {
  const tag = getTag(element);
  return FORM_TAGS$2.includes(tag) || isCustomElement(tag)
}

function isElementDisabled(element) {
  return canElementBeDisabled(element) && element.hasAttribute('disabled')
}

function isAncestorDisabled(element) {
  const parent = element.parentElement;
  return (
    Boolean(parent) &&
    (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent))
  )
}

function isElementOrAncestorDisabled(element) {
  return (
    canElementBeDisabled(element) &&
    (isElementDisabled(element) || isAncestorDisabled(element))
  )
}

function toBeDisabled(element) {
  checkHtmlElement(element, toBeDisabled, this);

  const isDisabled = isElementOrAncestorDisabled(element);

  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeDisabled`,
          'element',
          '',
        ),
        '',
        `Received element ${is} disabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

function toBeEnabled(element) {
  checkHtmlElement(element, toBeEnabled, this);

  const isEnabled = !isElementOrAncestorDisabled(element);

  return {
    pass: isEnabled,
    message: () => {
      const is = isEnabled ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeEnabled`,
          'element',
          '',
        ),
        '',
        `Received element ${is} enabled:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

// form elements that support 'required'
const FORM_TAGS$1 = ['select', 'textarea'];

const ARIA_FORM_TAGS = ['input', 'select', 'textarea'];

const UNSUPPORTED_INPUT_TYPES = [
  'color',
  'hidden',
  'range',
  'submit',
  'image',
  'reset',
];

const SUPPORTED_ARIA_ROLES = [
  'combobox',
  'gridcell',
  'radiogroup',
  'spinbutton',
  'tree',
];

function isRequiredOnFormTagsExceptInput(element) {
  return FORM_TAGS$1.includes(getTag(element)) && element.hasAttribute('required')
}

function isRequiredOnSupportedInput(element) {
  return (
    getTag(element) === 'input' &&
    element.hasAttribute('required') &&
    ((element.hasAttribute('type') &&
      !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute('type'))) ||
      !element.hasAttribute('type'))
  )
}

function isElementRequiredByARIA(element) {
  return (
    element.hasAttribute('aria-required') &&
    element.getAttribute('aria-required') === 'true' &&
    (ARIA_FORM_TAGS.includes(getTag(element)) ||
      (element.hasAttribute('role') &&
        SUPPORTED_ARIA_ROLES.includes(element.getAttribute('role'))))
  )
}

function toBeRequired(element) {
  checkHtmlElement(element, toBeRequired, this);

  const isRequired =
    isRequiredOnFormTagsExceptInput(element) ||
    isRequiredOnSupportedInput(element) ||
    isElementRequiredByARIA(element);

  return {
    pass: isRequired,
    message: () => {
      const is = isRequired ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeRequired`,
          'element',
          '',
        ),
        '',
        `Received element ${is} required:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

const FORM_TAGS = ['form', 'input', 'select', 'textarea'];

function isElementHavingAriaInvalid(element) {
  return (
    element.hasAttribute('aria-invalid') &&
    element.getAttribute('aria-invalid') !== 'false'
  )
}

function isSupportsValidityMethod(element) {
  return FORM_TAGS.includes(getTag(element))
}

function isElementInvalid(element) {
  const isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  if (isSupportsValidityMethod(element)) {
    return isHaveAriaInvalid || !element.checkValidity()
  } else {
    return isHaveAriaInvalid
  }
}

function toBeInvalid(element) {
  checkHtmlElement(element, toBeInvalid, this);

  const isInvalid = isElementInvalid(element);

  return {
    pass: isInvalid,
    message: () => {
      const is = isInvalid ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeInvalid`,
          'element',
          '',
        ),
        '',
        `Received element ${is} currently invalid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

function toBeValid(element) {
  checkHtmlElement(element, toBeValid, this);

  const isValid = !isElementInvalid(element);

  return {
    pass: isValid,
    message: () => {
      const is = isValid ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeValid`,
          'element',
          '',
        ),
        '',
        `Received element ${is} currently valid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

function toHaveValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveValue, this);

  if (
    htmlElement.tagName.toLowerCase() === 'input' &&
    ['checkbox', 'radio'].includes(htmlElement.type)
  ) {
    throw new Error(
      'input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead',
    )
  }

  const receivedValue = getSingleElementValue(htmlElement);
  const expectsValue = expectedValue !== undefined;

  let expectedTypedValue = expectedValue;
  let receivedTypedValue = receivedValue;
  if (expectedValue == receivedValue && expectedValue !== receivedValue) {
    expectedTypedValue = `${expectedValue} (${typeof expectedValue})`;
    receivedTypedValue = `${receivedValue} (${typeof receivedValue})`;
  }

  return {
    pass: expectsValue
      ? isEqualWith(receivedValue, expectedValue, compareArraysAsSet)
      : Boolean(receivedValue),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const matcher = this.utils.matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveValue`,
        'element',
        expectedValue,
      );
      return getMessage(
        this,
        matcher,
        `Expected the element ${to} have value`,
        expectsValue ? expectedTypedValue : '(any)',
        'Received',
        receivedTypedValue,
      )
    },
  }
}

function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this);
  const tagName = htmlElement.tagName.toLowerCase();

  if (!['select', 'input', 'textarea'].includes(tagName)) {
    throw new Error(
      '.toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead.',
    )
  }

  if (tagName === 'input' && ['radio', 'checkbox'].includes(htmlElement.type)) {
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`,
    )
  }

  const values = getValues(tagName, htmlElement);
  const expectedValues = getExpectedValues(expectedValue);
  const numberOfMatchesWithValues = expectedValues.filter(expected =>
    values.some(value =>
      expected instanceof RegExp
        ? expected.test(value)
        : this.equals(value, String(expected)),
    ),
  ).length;

  const matchedWithAllValues = numberOfMatchesWithValues === values.length;
  const matchedWithAllExpectedValues =
    numberOfMatchesWithValues === expectedValues.length;

  return {
    pass: matchedWithAllValues && matchedWithAllExpectedValues,
    message: () =>
      getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveDisplayValue`,
          'element',
          '',
        ),
        `Expected element ${this.isNot ? 'not ' : ''}to have display value`,
        expectedValue,
        'Received',
        values,
      ),
  }
}

function getValues(tagName, htmlElement) {
  return tagName === 'select'
    ? Array.from(htmlElement)
        .filter(option => option.selected)
        .map(option => option.textContent)
    : [htmlElement.value]
}

function getExpectedValues(expectedValue) {
  return expectedValue instanceof Array ? expectedValue : [expectedValue]
}

function toBeChecked(element) {
  checkHtmlElement(element, toBeChecked, this);

  const isValidInput = () => {
    return (
      element.tagName.toLowerCase() === 'input' &&
      ['checkbox', 'radio'].includes(element.type)
    )
  };

  const isValidAriaElement = () => {
    return (
      roleSupportsChecked(element.getAttribute('role')) &&
      ['true', 'false'].includes(element.getAttribute('aria-checked'))
    )
  };

  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () =>
        `only inputs with type="checkbox" or type="radio" or elements with ${supportedRolesSentence()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead`,
    }
  }

  const isChecked = () => {
    if (isValidInput()) return element.checked
    return element.getAttribute('aria-checked') === 'true'
  };

  return {
    pass: isChecked(),
    message: () => {
      const is = isChecked() ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeChecked`,
          'element',
          '',
        ),
        '',
        `Received element ${is} checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

function supportedRolesSentence() {
  return toSentence(
    supportedRoles().map(role => `role="${role}"`),
    {lastWordConnector: ' or '},
  )
}

function supportedRoles() {
  return ariaQuery.roles.keys().filter(roleSupportsChecked)
}

function roleSupportsChecked(role) {
  return ariaQuery.roles.get(role)?.props['aria-checked'] !== undefined
}

function toBePartiallyChecked(element) {
  checkHtmlElement(element, toBePartiallyChecked, this);

  const isValidInput = () => {
    return (
      element.tagName.toLowerCase() === 'input' && element.type === 'checkbox'
    )
  };

  const isValidAriaElement = () => {
    return element.getAttribute('role') === 'checkbox'
  };

  if (!isValidInput() && !isValidAriaElement()) {
    return {
      pass: false,
      message: () =>
        'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead',
    }
  }

  const isPartiallyChecked = () => {
    const isAriaMixed = element.getAttribute('aria-checked') === 'mixed';

    if (isValidInput()) {
      return element.indeterminate || isAriaMixed
    }

    return isAriaMixed
  };

  return {
    pass: isPartiallyChecked(),
    message: () => {
      const is = isPartiallyChecked() ? 'is' : 'is not';
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBePartiallyChecked`,
          'element',
          '',
        ),
        '',
        `Received element ${is} partially checked:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

// See algoritm: https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description
function toHaveDescription(htmlElement, checkWith) {
  deprecate(
    'toHaveDescription',
    'Please use toHaveAccessibleDescription.',
  );

  checkHtmlElement(htmlElement, toHaveDescription, this);

  const expectsDescription = checkWith !== undefined;

  const descriptionIDRaw = htmlElement.getAttribute('aria-describedby') || '';
  const descriptionIDs = descriptionIDRaw.split(/\s+/).filter(Boolean);
  let description = '';
  if (descriptionIDs.length > 0) {
    const document = htmlElement.ownerDocument;
    const descriptionEls = descriptionIDs
      .map(descriptionID => document.getElementById(descriptionID))
      .filter(Boolean);
    description = normalize(descriptionEls.map(el => el.textContent).join(' '));
  }

  return {
    pass: expectsDescription
      ? checkWith instanceof RegExp
        ? checkWith.test(description)
        : this.equals(description, checkWith)
      : Boolean(description),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveDescription`,
          'element',
          '',
        ),
        `Expected the element ${to} have description`,
        this.utils.printExpected(checkWith),
        'Received',
        this.utils.printReceived(description),
      )
    },
  }
}

// See aria-errormessage spec https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
function toHaveErrorMessage(htmlElement, checkWith) {
  deprecate('toHaveErrorMessage', 'Please use toHaveAccessibleErrorMessage.');
  checkHtmlElement(htmlElement, toHaveErrorMessage, this);

  if (
    !htmlElement.hasAttribute('aria-invalid') ||
    htmlElement.getAttribute('aria-invalid') === 'false'
  ) {
    const not = this.isNot ? '.not' : '';

    return {
      pass: false,
      message: () => {
        return getMessage(
          this,
          this.utils.matcherHint(`${not}.toHaveErrorMessage`, 'element', ''),
          `Expected the element to have invalid state indicated by`,
          'aria-invalid="true"',
          'Received',
          htmlElement.hasAttribute('aria-invalid')
            ? `aria-invalid="${htmlElement.getAttribute('aria-invalid')}"`
            : this.utils.printReceived(''),
        )
      },
    }
  }

  const expectsErrorMessage = checkWith !== undefined;

  const errormessageIDRaw = htmlElement.getAttribute('aria-errormessage') || '';
  const errormessageIDs = errormessageIDRaw.split(/\s+/).filter(Boolean);

  let errormessage = '';
  if (errormessageIDs.length > 0) {
    const document = htmlElement.ownerDocument;

    const errormessageEls = errormessageIDs
      .map(errormessageID => document.getElementById(errormessageID))
      .filter(Boolean);

    errormessage = normalize(
      errormessageEls.map(el => el.textContent).join(' '),
    );
  }

  return {
    pass: expectsErrorMessage
      ? checkWith instanceof RegExp
        ? checkWith.test(errormessage)
        : this.equals(errormessage, checkWith)
      : Boolean(errormessage),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveErrorMessage`,
          'element',
          '',
        ),
        `Expected the element ${to} have error message`,
        this.utils.printExpected(checkWith),
        'Received',
        this.utils.printReceived(errormessage),
      )
    },
  }
}

var extensions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  toBeChecked: toBeChecked,
  toBeDisabled: toBeDisabled,
  toBeEmpty: toBeEmpty,
  toBeEmptyDOMElement: toBeEmptyDOMElement,
  toBeEnabled: toBeEnabled,
  toBeInTheDOM: toBeInTheDOM,
  toBeInTheDocument: toBeInTheDocument,
  toBeInvalid: toBeInvalid,
  toBePartiallyChecked: toBePartiallyChecked,
  toBeRequired: toBeRequired,
  toBeValid: toBeValid,
  toBeVisible: toBeVisible,
  toContainElement: toContainElement,
  toContainHTML: toContainHTML,
  toHaveAccessibleDescription: toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage: toHaveAccessibleErrorMessage,
  toHaveAccessibleName: toHaveAccessibleName,
  toHaveAttribute: toHaveAttribute,
  toHaveClass: toHaveClass,
  toHaveDescription: toHaveDescription,
  toHaveDisplayValue: toHaveDisplayValue,
  toHaveErrorMessage: toHaveErrorMessage,
  toHaveFocus: toHaveFocus,
  toHaveFormValues: toHaveFormValues,
  toHaveStyle: toHaveStyle,
  toHaveTextContent: toHaveTextContent,
  toHaveValue: toHaveValue
});

exports.extensions = extensions;
exports.toBeChecked = toBeChecked;
exports.toBeDisabled = toBeDisabled;
exports.toBeEmpty = toBeEmpty;
exports.toBeEmptyDOMElement = toBeEmptyDOMElement;
exports.toBeEnabled = toBeEnabled;
exports.toBeInTheDOM = toBeInTheDOM;
exports.toBeInTheDocument = toBeInTheDocument;
exports.toBeInvalid = toBeInvalid;
exports.toBePartiallyChecked = toBePartiallyChecked;
exports.toBeRequired = toBeRequired;
exports.toBeValid = toBeValid;
exports.toBeVisible = toBeVisible;
exports.toContainElement = toContainElement;
exports.toContainHTML = toContainHTML;
exports.toHaveAccessibleDescription = toHaveAccessibleDescription;
exports.toHaveAccessibleErrorMessage = toHaveAccessibleErrorMessage;
exports.toHaveAccessibleName = toHaveAccessibleName;
exports.toHaveAttribute = toHaveAttribute;
exports.toHaveClass = toHaveClass;
exports.toHaveDescription = toHaveDescription;
exports.toHaveDisplayValue = toHaveDisplayValue;
exports.toHaveErrorMessage = toHaveErrorMessage;
exports.toHaveFocus = toHaveFocus;
exports.toHaveFormValues = toHaveFormValues;
exports.toHaveStyle = toHaveStyle;
exports.toHaveTextContent = toHaveTextContent;
exports.toHaveValue = toHaveValue;
