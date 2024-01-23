"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_PROJECT_ROOT: null,
    NEXT_PROJECT_ROOT_DIST: null,
    attachReactRefresh: null,
    NODE_RESOLVE_OPTIONS: null,
    NODE_BASE_RESOLVE_OPTIONS: null,
    NODE_ESM_RESOLVE_OPTIONS: null,
    NODE_BASE_ESM_RESOLVE_OPTIONS: null,
    nextImageLoaderRegex: null,
    loadProjectInfo: null,
    hasExternalOtelApiPackage: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_PROJECT_ROOT: function() {
        return NEXT_PROJECT_ROOT;
    },
    NEXT_PROJECT_ROOT_DIST: function() {
        return NEXT_PROJECT_ROOT_DIST;
    },
    attachReactRefresh: function() {
        return attachReactRefresh;
    },
    NODE_RESOLVE_OPTIONS: function() {
        return NODE_RESOLVE_OPTIONS;
    },
    NODE_BASE_RESOLVE_OPTIONS: function() {
        return NODE_BASE_RESOLVE_OPTIONS;
    },
    NODE_ESM_RESOLVE_OPTIONS: function() {
        return NODE_ESM_RESOLVE_OPTIONS;
    },
    NODE_BASE_ESM_RESOLVE_OPTIONS: function() {
        return NODE_BASE_ESM_RESOLVE_OPTIONS;
    },
    nextImageLoaderRegex: function() {
        return nextImageLoaderRegex;
    },
    loadProjectInfo: function() {
        return loadProjectInfo;
    },
    hasExternalOtelApiPackage: function() {
        return hasExternalOtelApiPackage;
    },
    default: function() {
        return getBaseWebpackConfig;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _ReactRefreshWebpackPlugin = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshWebpackPlugin"));
const _picocolors = require("../lib/picocolors");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _webpack = require("next/dist/compiled/webpack/webpack");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _semver = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/semver"));
const _escaperegexp = require("../shared/lib/escape-regexp");
const _constants = require("../lib/constants");
const _utils = require("./utils");
const _constants1 = require("../shared/lib/constants");
const _utils1 = require("../shared/lib/utils");
const _entries = require("./entries");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("./output/log"));
const _config = require("./webpack/config");
const _middlewareplugin = /*#__PURE__*/ _interop_require_wildcard(require("./webpack/plugins/middleware-plugin"));
const _buildmanifestplugin = /*#__PURE__*/ _interop_require_default(require("./webpack/plugins/build-manifest-plugin"));
const _jsconfigpathsplugin = require("./webpack/plugins/jsconfig-paths-plugin");
const _nextdropclientpageplugin = require("./webpack/plugins/next-drop-client-page-plugin");
const _pagesmanifestplugin = /*#__PURE__*/ _interop_require_default(require("./webpack/plugins/pages-manifest-plugin"));
const _profilingplugin = require("./webpack/plugins/profiling-plugin");
const _reactloadableplugin = require("./webpack/plugins/react-loadable-plugin");
const _wellknownerrorsplugin = require("./webpack/plugins/wellknown-errors-plugin");
const _css = require("./webpack/config/blocks/css");
const _copyfileplugin = require("./webpack/plugins/copy-file-plugin");
const _flightmanifestplugin = require("./webpack/plugins/flight-manifest-plugin");
const _flightcliententryplugin = require("./webpack/plugins/flight-client-entry-plugin");
const _nexttypesplugin = require("./webpack/plugins/next-types-plugin");
const _loadjsconfig = /*#__PURE__*/ _interop_require_default(require("./load-jsconfig"));
const _swc = require("./swc");
const _appbuildmanifestplugin = require("./webpack/plugins/app-build-manifest-plugin");
const _subresourceintegrityplugin = require("./webpack/plugins/subresource-integrity-plugin");
const _nextfontmanifestplugin = require("./webpack/plugins/next-font-manifest-plugin");
const _memorywithgccacheplugin = require("./webpack/plugins/memory-with-gc-cache-plugin");
const _getbabelconfigfile = require("./get-babel-config-file");
const _needsexperimentalreact = require("../lib/needs-experimental-react");
const _defineenvplugin = require("./webpack/plugins/define-env-plugin");
const _handleexternals = require("./handle-externals");
const _resolve = require("./webpack-config-rules/resolve");
const _optionalpeerdependencyresolveplugin = require("./webpack/plugins/optional-peer-dependency-resolve-plugin");
const _createcompileraliases = require("./create-compiler-aliases");
const _utils2 = require("../export/utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const EXTERNAL_PACKAGES = require("../lib/server-external-packages.json");
const NEXT_PROJECT_ROOT = _path.default.join(__dirname, "..", "..");
const NEXT_PROJECT_ROOT_DIST = _path.default.join(NEXT_PROJECT_ROOT, "dist");
const NEXT_PROJECT_ROOT_DIST_CLIENT = _path.default.join(NEXT_PROJECT_ROOT_DIST, "client");
if (parseInt(_react.default.version) < 18) {
    throw new Error("Next.js requires react >= 18.2.0 to be installed.");
}
const babelIncludeRegexes = [
    /next[\\/]dist[\\/](esm[\\/])?shared[\\/]lib/,
    /next[\\/]dist[\\/](esm[\\/])?client/,
    /next[\\/]dist[\\/](esm[\\/])?pages/,
    /[\\/](strip-ansi|ansi-regex|styled-jsx)[\\/]/
];
const asyncStoragesRegex = /next[\\/]dist[\\/](esm[\\/])?client[\\/]components[\\/](static-generation-async-storage|action-async-storage|request-async-storage)/;
// Support for NODE_PATH
const nodePathList = (process.env.NODE_PATH || "").split(process.platform === "win32" ? ";" : ":").filter((p)=>!!p);
const watchOptions = Object.freeze({
    aggregateTimeout: 5,
    ignored: // Matches **/node_modules/**, **/.git/** and **/.next/**
    /^((?:[^/]*(?:\/|$))*)(\.(git|next)|node_modules)(\/((?:[^/]*(?:\/|$))*)(?:$|\/))?/
});
function isModuleCSS(module1) {
    return(// mini-css-extract-plugin
    module1.type === `css/mini-extract` || // extract-css-chunks-webpack-plugin (old)
    module1.type === `css/extract-chunks` || // extract-css-chunks-webpack-plugin (new)
    module1.type === `css/extract-css-chunks`);
}
const devtoolRevertWarning = (0, _utils1.execOnce)((devtool)=>{
    console.warn((0, _picocolors.yellow)((0, _picocolors.bold)("Warning: ")) + (0, _picocolors.bold)(`Reverting webpack devtool to '${devtool}'.\n`) + "Changing the webpack devtool in development mode will cause severe performance regressions.\n" + "Read more: https://nextjs.org/docs/messages/improper-devtool");
});
let loggedSwcDisabled = false;
let loggedIgnoredCompilerOptions = false;
const reactRefreshLoaderName = "next/dist/compiled/@next/react-refresh-utils/dist/loader";
function attachReactRefresh(webpackConfig, targetLoader) {
    var _webpackConfig_module_rules, _webpackConfig_module;
    let injections = 0;
    const reactRefreshLoader = require.resolve(reactRefreshLoaderName);
    (_webpackConfig_module = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules = _webpackConfig_module.rules) == null ? void 0 : _webpackConfig_module_rules.forEach((rule)=>{
        if (rule && typeof rule === "object" && "use" in rule) {
            const curr = rule.use;
            // When the user has configured `defaultLoaders.babel` for a input file:
            if (curr === targetLoader) {
                ++injections;
                rule.use = [
                    reactRefreshLoader,
                    curr
                ];
            } else if (Array.isArray(curr) && curr.some((r)=>r === targetLoader) && // Check if loader already exists:
            !curr.some((r)=>r === reactRefreshLoader || r === reactRefreshLoaderName)) {
                ++injections;
                const idx = curr.findIndex((r)=>r === targetLoader);
                // Clone to not mutate user input
                rule.use = [
                    ...curr
                ];
                // inject / input: [other, babel] output: [other, refresh, babel]:
                rule.use.splice(idx, 0, reactRefreshLoader);
            }
        }
    });
    if (injections) {
        _log.info(`automatically enabled Fast Refresh for ${injections} custom loader${injections > 1 ? "s" : ""}`);
    }
}
const NODE_RESOLVE_OPTIONS = {
    dependencyType: "commonjs",
    modules: [
        "node_modules"
    ],
    fallback: false,
    exportsFields: [
        "exports"
    ],
    importsFields: [
        "imports"
    ],
    conditionNames: [
        "node",
        "require"
    ],
    descriptionFiles: [
        "package.json"
    ],
    extensions: [
        ".js",
        ".json",
        ".node"
    ],
    enforceExtensions: false,
    symlinks: true,
    mainFields: [
        "main"
    ],
    mainFiles: [
        "index"
    ],
    roots: [],
    fullySpecified: false,
    preferRelative: false,
    preferAbsolute: false,
    restrictions: []
};
const NODE_BASE_RESOLVE_OPTIONS = {
    ...NODE_RESOLVE_OPTIONS,
    alias: false
};
const NODE_ESM_RESOLVE_OPTIONS = {
    ...NODE_RESOLVE_OPTIONS,
    alias: false,
    dependencyType: "esm",
    conditionNames: [
        "node",
        "import"
    ],
    fullySpecified: true
};
const NODE_BASE_ESM_RESOLVE_OPTIONS = {
    ...NODE_ESM_RESOLVE_OPTIONS,
    alias: false
};
const nextImageLoaderRegex = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i;
async function loadProjectInfo({ dir, config, dev }) {
    const { jsConfig, resolvedBaseUrl } = await (0, _loadjsconfig.default)(dir, config);
    const supportedBrowsers = await (0, _utils.getSupportedBrowsers)(dir, dev);
    return {
        jsConfig,
        resolvedBaseUrl,
        supportedBrowsers
    };
}
function getOpenTelemetryVersion() {
    try {
        var _require;
        return ((_require = require("@opentelemetry/api/package.json")) == null ? void 0 : _require.version) ?? null;
    } catch  {
        return null;
    }
}
function hasExternalOtelApiPackage() {
    const opentelemetryVersion = getOpenTelemetryVersion();
    if (!opentelemetryVersion) {
        return false;
    }
    // 0.19.0 is the first version of the package that has the `tracer.getSpan` API that we need:
    // https://github.com/vercel/next.js/issues/48118
    if (_semver.default.gte(opentelemetryVersion, "0.19.0")) {
        return true;
    } else {
        throw new Error(`Installed "@opentelemetry/api" with version ${opentelemetryVersion} is not supported by Next.js. Please upgrade to 0.19.0 or newer version.`);
    }
}
const UNSAFE_CACHE_REGEX = /[\\/]pages[\\/][^\\/]+(?:$|\?|#)/;
async function getBaseWebpackConfig(dir, { buildId, config, compilerType, dev = false, entrypoints, isDevFallback = false, pagesDir, reactProductionProfiling = false, rewrites, originalRewrites, originalRedirects, runWebpackSpan, appDir, middlewareMatchers, noMangling = false, jsConfig, resolvedBaseUrl, supportedBrowsers, clientRouterFilters, previewModeId, fetchCacheKeyPrefix, allowedRevalidateHeaderKeys }) {
    var _config_transpilePackages, _config_experimental_sri, _config_experimental_sri1, _config_compiler, _config_compiler1, _config_compiler2, _jsConfig_compilerOptions, _config_compiler3, _jsConfig_compilerOptions1, _config_compiler4, _jsConfig_compilerOptions2, // always add JsConfigPathsPlugin to allow hot-reloading
    // if the config is added/removed
    _webpackConfig_resolve_plugins, _webpackConfig_resolve, _config_compiler5, _config_compiler6, _config_compiler7, _config_compiler8, _config_compiler9, _webpackConfig_module, _webpackConfig_module_rules, _webpackConfig_module1;
    const isClient = compilerType === _constants1.COMPILER_NAMES.client;
    const isEdgeServer = compilerType === _constants1.COMPILER_NAMES.edgeServer;
    const isNodeServer = compilerType === _constants1.COMPILER_NAMES.server;
    // If the current compilation is aimed at server-side code instead of client-side code.
    const isNodeOrEdgeCompilation = isNodeServer || isEdgeServer;
    const hasRewrites = rewrites.beforeFiles.length > 0 || rewrites.afterFiles.length > 0 || rewrites.fallback.length > 0;
    const hasAppDir = !!appDir;
    const disableOptimizedLoading = true;
    const enableTypedRoutes = !!config.experimental.typedRoutes && hasAppDir;
    const bundledReactChannel = (0, _needsexperimentalreact.needsExperimentalReact)(config) ? "-experimental" : "";
    const babelConfigFile = (0, _getbabelconfigfile.getBabelConfigFile)(dir);
    if ((0, _utils2.hasCustomExportOutput)(config)) {
        config.distDir = ".next";
    }
    const distDir = _path.default.join(dir, config.distDir);
    let useSWCLoader = !babelConfigFile || config.experimental.forceSwcTransforms;
    let SWCBinaryTarget = undefined;
    if (useSWCLoader) {
        var _require_getBinaryMetadata, _require_getBinaryMetadata1, _require;
        // TODO: we do not collect wasm target yet
        const binaryTarget = (_require = require("./swc")) == null ? void 0 : (_require_getBinaryMetadata1 = _require.getBinaryMetadata) == null ? void 0 : (_require_getBinaryMetadata = _require_getBinaryMetadata1.call(_require)) == null ? void 0 : _require_getBinaryMetadata.target;
        SWCBinaryTarget = binaryTarget ? [
            `swc/target/${binaryTarget}`,
            true
        ] : undefined;
    }
    if (!loggedSwcDisabled && !useSWCLoader && babelConfigFile) {
        _log.info(`Disabled SWC as replacement for Babel because of custom Babel configuration "${_path.default.relative(dir, babelConfigFile)}" https://nextjs.org/docs/messages/swc-disabled`);
        loggedSwcDisabled = true;
    }
    // eagerly load swc bindings instead of waiting for transform calls
    if (!babelConfigFile && isClient) {
        await (0, _swc.loadBindings)(config.experimental.useWasmBinary);
    }
    if (!loggedIgnoredCompilerOptions && !useSWCLoader && config.compiler) {
        _log.info("`compiler` options in `next.config.js` will be ignored while using Babel https://nextjs.org/docs/messages/ignored-compiler-options");
        loggedIgnoredCompilerOptions = true;
    }
    const babelLoader = function getBabelLoader() {
        if (useSWCLoader) return undefined;
        return {
            loader: require.resolve("./babel/loader/index"),
            options: {
                configFile: babelConfigFile,
                isServer: isNodeOrEdgeCompilation,
                distDir,
                pagesDir,
                cwd: dir,
                development: dev,
                hasReactRefresh: dev && isClient,
                hasJsxRuntime: true
            }
        };
    }();
    let swcTraceProfilingInitialized = false;
    const getSwcLoader = (extraOptions)=>{
        var _config_experimental;
        if ((config == null ? void 0 : (_config_experimental = config.experimental) == null ? void 0 : _config_experimental.swcTraceProfiling) && !swcTraceProfilingInitialized) {
            var _require_initCustomTraceSubscriber, _require;
            // This will init subscribers once only in a single process lifecycle,
            // even though it can be called multiple times.
            // Subscriber need to be initialized _before_ any actual swc's call (transform, etcs)
            // to collect correct trace spans when they are called.
            swcTraceProfilingInitialized = true;
            (_require = require("./swc")) == null ? void 0 : (_require_initCustomTraceSubscriber = _require.initCustomTraceSubscriber) == null ? void 0 : _require_initCustomTraceSubscriber.call(_require, _path.default.join(distDir, `swc-trace-profile-${Date.now()}.json`));
        }
        return {
            loader: "next-swc-loader",
            options: {
                isServer: isNodeOrEdgeCompilation,
                rootDir: dir,
                pagesDir,
                appDir,
                hasReactRefresh: dev && isClient,
                nextConfig: config,
                jsConfig,
                supportedBrowsers,
                swcCacheDir: _path.default.join(dir, (config == null ? void 0 : config.distDir) ?? ".next", "cache", "swc"),
                ...extraOptions
            }
        };
    };
    // RSC loaders, prefer ESM, set `esm` to true
    const swcServerLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.reactServerComponents,
        esm: true
    });
    const swcSSRLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
        esm: true
    });
    const swcBrowserLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
        esm: true
    });
    // Default swc loaders for pages doesn't prefer ESM.
    const swcDefaultLoader = getSwcLoader({
        serverComponents: true,
        esm: false
    });
    const defaultLoaders = {
        babel: useSWCLoader ? swcDefaultLoader : babelLoader
    };
    const appServerLayerLoaders = hasAppDir ? [
        // When using Babel, we will have to add the SWC loader
        // as an additional pass to handle RSC correctly.
        // This will cause some performance overhead but
        // acceptable as Babel will not be recommended.
        swcServerLayerLoader,
        babelLoader
    ].filter(Boolean) : [];
    const middlewareLayerLoaders = [
        // When using Babel, we will have to use SWC to do the optimization
        // for middleware to tree shake the unused default optimized imports like "next/server".
        // This will cause some performance overhead but
        // acceptable as Babel will not be recommended.
        getSwcLoader({
            serverComponents: false,
            bundleLayer: _constants.WEBPACK_LAYERS.middleware
        }),
        babelLoader
    ].filter(Boolean);
    const reactRefreshLoaders = dev && isClient ? [
        require.resolve(reactRefreshLoaderName)
    ] : [];
    // client components layers: SSR or browser
    const createClientLayerLoader = ({ isBrowserLayer, reactRefresh })=>[
            ...reactRefresh ? reactRefreshLoaders : [],
            {
                // This loader handles actions and client entries
                // in the client layer.
                loader: "next-flight-client-module-loader"
            },
            ...hasAppDir ? [
                // When using Babel, we will have to add the SWC loader
                // as an additional pass to handle RSC correctly.
                // This will cause some performance overhead but
                // acceptable as Babel will not be recommended.
                isBrowserLayer ? swcBrowserLayerLoader : swcSSRLayerLoader,
                babelLoader
            ].filter(Boolean) : []
        ];
    const appBrowserLayerLoaders = createClientLayerLoader({
        isBrowserLayer: true,
        // reactRefresh for browser layer is applied conditionally to user-land source
        reactRefresh: false
    });
    const appSSRLayerLoaders = createClientLayerLoader({
        isBrowserLayer: false,
        reactRefresh: true
    });
    // Loader for API routes needs to be differently configured as it shouldn't
    // have RSC transpiler enabled, so syntax checks such as invalid imports won't
    // be performed.
    const apiRoutesLayerLoaders = hasAppDir && useSWCLoader ? getSwcLoader({
        serverComponents: false,
        bundleLayer: _constants.WEBPACK_LAYERS.api
    }) : defaultLoaders.babel;
    const pageExtensions = config.pageExtensions;
    const outputPath = isNodeOrEdgeCompilation ? _path.default.join(distDir, _constants1.SERVER_DIRECTORY) : distDir;
    const reactServerCondition = [
        "react-server",
        ...isEdgeServer ? _resolve.edgeConditionNames : [],
        // inherits the default conditions
        "..."
    ];
    const clientEntries = isClient ? {
        // Backwards compatibility
        "main.js": [],
        ...dev ? {
            [_constants1.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH]: require.resolve(`next/dist/compiled/@next/react-refresh-utils/dist/runtime`),
            [_constants1.CLIENT_STATIC_FILES_RUNTIME_AMP]: `./` + _path.default.relative(dir, _path.default.join(NEXT_PROJECT_ROOT_DIST_CLIENT, "dev", "amp-dev")).replace(/\\/g, "/")
        } : {},
        [_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN]: `./` + _path.default.relative(dir, _path.default.join(NEXT_PROJECT_ROOT_DIST_CLIENT, dev ? `next-dev.js` : "next.js")).replace(/\\/g, "/"),
        ...hasAppDir ? {
            [_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP]: dev ? [
                require.resolve(`next/dist/compiled/@next/react-refresh-utils/dist/runtime`),
                `./` + _path.default.relative(dir, _path.default.join(NEXT_PROJECT_ROOT_DIST_CLIENT, "app-next-dev.js")).replace(/\\/g, "/")
            ] : [
                `./` + _path.default.relative(dir, _path.default.join(NEXT_PROJECT_ROOT_DIST_CLIENT, "app-next.js")).replace(/\\/g, "/")
            ]
        } : {}
    } : undefined;
    const resolveConfig = {
        // Disable .mjs for node_modules bundling
        extensions: [
            ".js",
            ".mjs",
            ".tsx",
            ".ts",
            ".jsx",
            ".json",
            ".wasm"
        ],
        extensionAlias: config.experimental.extensionAlias,
        modules: [
            "node_modules",
            ...nodePathList
        ],
        alias: (0, _createcompileraliases.createWebpackAliases)({
            distDir,
            isClient,
            isEdgeServer,
            isNodeServer,
            dev,
            config,
            pagesDir,
            appDir,
            dir,
            reactProductionProfiling,
            hasRewrites
        }),
        ...isClient || isEdgeServer ? {
            fallback: {
                process: require.resolve("./polyfills/process")
            }
        } : undefined,
        // default main fields use pages dir ones, and customize app router ones in loaders.
        mainFields: (0, _resolve.getMainField)(compilerType, false),
        ...isEdgeServer && {
            conditionNames: _resolve.edgeConditionNames
        },
        plugins: [
            isNodeServer ? new _optionalpeerdependencyresolveplugin.OptionalPeerDependencyResolverPlugin() : undefined
        ].filter(Boolean)
    };
    const terserOptions = {
        parse: {
            ecma: 8
        },
        compress: {
            ecma: 5,
            warnings: false,
            // The following two options are known to break valid JavaScript code
            comparisons: false,
            inline: 2
        },
        mangle: {
            safari10: true,
            ...process.env.__NEXT_MANGLING_DEBUG || noMangling ? {
                toplevel: true,
                module: true,
                keep_classnames: true,
                keep_fnames: true
            } : {}
        },
        output: {
            ecma: 5,
            safari10: true,
            comments: false,
            // Fixes usage of Emoji and certain Regex
            ascii_only: true,
            ...process.env.__NEXT_MANGLING_DEBUG || noMangling ? {
                beautify: true
            } : {}
        }
    };
    // Packages which will be split into the 'framework' chunk.
    // Only top-level packages are included, e.g. nested copies like
    // 'node_modules/meow/node_modules/object-assign' are not included.
    const topLevelFrameworkPaths = [];
    const visitedFrameworkPackages = new Set();
    // Adds package-paths of dependencies recursively
    const addPackagePath = (packageName, relativeToPath)=>{
        try {
            if (visitedFrameworkPackages.has(packageName)) {
                return;
            }
            visitedFrameworkPackages.add(packageName);
            const packageJsonPath = require.resolve(`${packageName}/package.json`, {
                paths: [
                    relativeToPath
                ]
            });
            // Include a trailing slash so that a `.startsWith(packagePath)` check avoids false positives
            // when one package name starts with the full name of a different package.
            // For example:
            //   "node_modules/react-slider".startsWith("node_modules/react")  // true
            //   "node_modules/react-slider".startsWith("node_modules/react/") // false
            const directory = _path.default.join(packageJsonPath, "../");
            // Returning from the function in case the directory has already been added and traversed
            if (topLevelFrameworkPaths.includes(directory)) return;
            topLevelFrameworkPaths.push(directory);
            const dependencies = require(packageJsonPath).dependencies || {};
            for (const name of Object.keys(dependencies)){
                addPackagePath(name, directory);
            }
        } catch (_) {
        // don't error on failing to resolve framework packages
        }
    };
    for (const packageName of [
        "react",
        "react-dom",
        ...hasAppDir ? [
            `next/dist/compiled/react${bundledReactChannel}`,
            `next/dist/compiled/react-dom${bundledReactChannel}`
        ] : []
    ]){
        addPackagePath(packageName, dir);
    }
    const crossOrigin = config.crossOrigin;
    // The `serverComponentsExternalPackages` should not conflict with
    // the `transpilePackages`.
    if (config.experimental.serverComponentsExternalPackages && config.transpilePackages) {
        const externalPackageConflicts = config.transpilePackages.filter((pkg)=>{
            var _config_experimental_serverComponentsExternalPackages;
            return (_config_experimental_serverComponentsExternalPackages = config.experimental.serverComponentsExternalPackages) == null ? void 0 : _config_experimental_serverComponentsExternalPackages.includes(pkg);
        });
        if (externalPackageConflicts.length > 0) {
            throw new Error(`The packages specified in the 'transpilePackages' conflict with the 'serverComponentsExternalPackages': ${externalPackageConflicts.join(", ")}`);
        }
    }
    // For original request, such as `package name`
    const optOutBundlingPackages = EXTERNAL_PACKAGES.concat(...config.experimental.serverComponentsExternalPackages || []).filter((pkg)=>{
        var _config_transpilePackages;
        return !((_config_transpilePackages = config.transpilePackages) == null ? void 0 : _config_transpilePackages.includes(pkg));
    });
    // For resolved request, such as `absolute path/package name/foo/bar.js`
    const optOutBundlingPackageRegex = new RegExp(`[/\\\\]node_modules[/\\\\](${optOutBundlingPackages.map((p)=>p.replace(/\//g, "[/\\\\]")).join("|")})[/\\\\]`);
    const transpilePackagesRegex = new RegExp(`[/\\\\]node_modules[/\\\\](${(_config_transpilePackages = config.transpilePackages) == null ? void 0 : _config_transpilePackages.map((p)=>p.replace(/\//g, "[/\\\\]")).join("|")})[/\\\\]`);
    const handleExternals = (0, _handleexternals.makeExternalHandler)({
        config,
        optOutBundlingPackages,
        optOutBundlingPackageRegex,
        dir
    });
    const shouldIncludeExternalDirs = config.experimental.externalDir || !!config.transpilePackages;
    const codeCondition = {
        test: {
            or: [
                /\.(tsx|ts|js|cjs|mjs|jsx)$/,
                /__barrel_optimize__/
            ]
        },
        ...shouldIncludeExternalDirs ? {} : {
            include: [
                dir,
                ...babelIncludeRegexes
            ]
        },
        exclude: (excludePath)=>{
            if (babelIncludeRegexes.some((r)=>r.test(excludePath))) {
                return false;
            }
            const shouldBeBundled = (0, _handleexternals.isResourceInPackages)(excludePath, config.transpilePackages);
            if (shouldBeBundled) return false;
            return excludePath.includes("node_modules");
        }
    };
    let webpackConfig = {
        parallelism: Number(process.env.NEXT_WEBPACK_PARALLELISM) || undefined,
        ...isNodeServer ? {
            externalsPresets: {
                node: true
            }
        } : {},
        // @ts-ignore
        externals: isClient || isEdgeServer ? // bundles in case a user imported types and it wasn't removed
        // TODO: should we warn/error for this instead?
        [
            "next",
            ...isEdgeServer ? [
                {
                    "@builder.io/partytown": "{}",
                    "next/dist/compiled/etag": "{}"
                },
                (0, _middlewareplugin.getEdgePolyfilledModules)(),
                _middlewareplugin.handleWebpackExternalForEdgeRuntime
            ] : []
        ] : [
            ({ context, request, dependencyType, contextInfo, getResolve })=>handleExternals(context, request, dependencyType, contextInfo.issuerLayer, (options)=>{
                    const resolveFunction = getResolve(options);
                    return (resolveContext, requestToResolve)=>new Promise((resolve, reject)=>{
                            resolveFunction(resolveContext, requestToResolve, (err, result, resolveData)=>{
                                var _resolveData_descriptionFileData;
                                if (err) return reject(err);
                                if (!result) return resolve([
                                    null,
                                    false
                                ]);
                                const isEsm = /\.js$/i.test(result) ? (resolveData == null ? void 0 : (_resolveData_descriptionFileData = resolveData.descriptionFileData) == null ? void 0 : _resolveData_descriptionFileData.type) === "module" : /\.mjs$/i.test(result);
                                resolve([
                                    result,
                                    isEsm
                                ]);
                            });
                        });
                })
        ],
        optimization: {
            emitOnErrors: !dev,
            checkWasmTypes: false,
            nodeEnv: false,
            splitChunks: (()=>{
                if (dev) {
                    if (isNodeServer) {
                        /*
              In development, we want to split code that comes from `node_modules` into their own chunks.
              This is because in development, we often need to reload the user bundle due to changes in the code.
              To work around this, we put all the vendor code into separate chunks so that we don't need to reload them.
              This is safe because the vendor code doesn't change between reloads.
            */ const extractRootNodeModule = (modulePath)=>{
                            // This regex is used to extract the root node module name to be used as the chunk group name.
                            // example: ../../node_modules/.pnpm/next@10/foo/node_modules/bar -> next@10
                            const regex = /node_modules(?:\/|\\)\.?(?:pnpm(?:\/|\\))?([^/\\]+)/;
                            const match = modulePath.match(regex);
                            return match ? match[1] : null;
                        };
                        return {
                            cacheGroups: {
                                // this chunk configuration gives us a separate chunk for each top level module in node_modules
                                // or a hashed chunk if we can't extract the module name.
                                vendor: {
                                    chunks: "all",
                                    reuseExistingChunk: true,
                                    test: /[\\/]node_modules[\\/]/,
                                    minSize: 0,
                                    minChunks: 1,
                                    maxAsyncRequests: 300,
                                    maxInitialRequests: 300,
                                    name: (module1)=>{
                                        const moduleId = module1.nameForCondition();
                                        const rootModule = extractRootNodeModule(moduleId);
                                        if (rootModule) {
                                            return `vendor-chunks/${rootModule}`;
                                        } else {
                                            const hash = _crypto.default.createHash("sha1").update(moduleId);
                                            hash.update(moduleId);
                                            return `vendor-chunks/${hash.digest("hex")}`;
                                        }
                                    }
                                },
                                // disable the default chunk groups
                                default: false,
                                defaultVendors: false
                            }
                        };
                    }
                    return false;
                }
                if (isNodeServer) {
                    return {
                        filename: "[name].js",
                        chunks: "all",
                        minChunks: 2
                    };
                }
                if (isEdgeServer) {
                    return {
                        filename: "edge-chunks/[name].js",
                        minChunks: 2
                    };
                }
                return {
                    // Keep main and _app chunks unsplitted in webpack 5
                    // as we don't need a separate vendor chunk from that
                    // and all other chunk depend on them so there is no
                    // duplication that need to be pulled out.
                    chunks: (chunk)=>!/^(polyfills|main|pages\/_app)$/.test(chunk.name),
                    cacheGroups: {
                        framework: {
                            chunks: "all",
                            name: "framework",
                            // Ensures the framework chunk is not created for App Router.
                            layer: _utils.isWebpackDefaultLayer,
                            test (module1) {
                                const resource = module1.nameForCondition == null ? void 0 : module1.nameForCondition.call(module1);
                                return resource ? topLevelFrameworkPaths.some((pkgPath)=>resource.startsWith(pkgPath)) : false;
                            },
                            priority: 40,
                            // Don't let webpack eliminate this chunk (prevents this chunk from
                            // becoming a part of the commons chunk)
                            enforce: true
                        },
                        lib: {
                            test (module1) {
                                return module1.size() > 160000 && /node_modules[/\\]/.test(module1.nameForCondition() || "");
                            },
                            name (module1) {
                                const hash = _crypto.default.createHash("sha1");
                                if (isModuleCSS(module1)) {
                                    module1.updateHash(hash);
                                } else {
                                    if (!module1.libIdent) {
                                        throw new Error(`Encountered unknown module type: ${module1.type}. Please open an issue.`);
                                    }
                                    hash.update(module1.libIdent({
                                        context: dir
                                    }));
                                }
                                // Ensures the name of the chunk is not the same between two modules in different layers
                                // E.g. if you import 'button-library' in App Router and Pages Router we don't want these to be bundled in the same chunk
                                // as they're never used on the same page.
                                if (module1.layer) {
                                    hash.update(module1.layer);
                                }
                                return hash.digest("hex").substring(0, 8);
                            },
                            priority: 30,
                            minChunks: 1,
                            reuseExistingChunk: true
                        }
                    },
                    maxInitialRequests: 25,
                    minSize: 20000
                };
            })(),
            runtimeChunk: isClient ? {
                name: _constants1.CLIENT_STATIC_FILES_RUNTIME_WEBPACK
            } : undefined,
            minimize: !dev && (isClient || isEdgeServer || isNodeServer && config.experimental.serverMinification),
            minimizer: [
                // Minify JavaScript
                (compiler)=>{
                    // @ts-ignore No typings yet
                    const { TerserPlugin } = require("./webpack/plugins/terser-webpack-plugin/src/index.js");
                    new TerserPlugin({
                        cacheDir: _path.default.join(distDir, "cache", "next-minifier"),
                        parallel: config.experimental.cpus,
                        swcMinify: config.swcMinify,
                        terserOptions: {
                            ...terserOptions,
                            compress: {
                                ...terserOptions.compress
                            },
                            mangle: {
                                ...terserOptions.mangle
                            }
                        }
                    }).apply(compiler);
                },
                // Minify CSS
                (compiler)=>{
                    const { CssMinimizerPlugin } = require("./webpack/plugins/css-minimizer-plugin");
                    new CssMinimizerPlugin({
                        postcssOptions: {
                            map: {
                                // `inline: false` generates the source map in a separate file.
                                // Otherwise, the CSS file is needlessly large.
                                inline: false,
                                // `annotation: false` skips appending the `sourceMappingURL`
                                // to the end of the CSS file. Webpack already handles this.
                                annotation: false
                            }
                        }
                    }).apply(compiler);
                }
            ]
        },
        context: dir,
        // Kept as function to be backwards compatible
        entry: async ()=>{
            return {
                ...clientEntries ? clientEntries : {},
                ...entrypoints
            };
        },
        watchOptions,
        output: {
            // we must set publicPath to an empty value to override the default of
            // auto which doesn't work in IE11
            publicPath: `${config.assetPrefix ? config.assetPrefix.endsWith("/") ? config.assetPrefix.slice(0, -1) : config.assetPrefix : ""}/_next/`,
            path: !dev && isNodeServer ? _path.default.join(outputPath, "chunks") : outputPath,
            // On the server we don't use hashes
            filename: isNodeOrEdgeCompilation ? dev || isEdgeServer ? `[name].js` : `../[name].js` : `static/chunks/${isDevFallback ? "fallback/" : ""}[name]${dev ? "" : appDir ? "-[chunkhash]" : "-[contenthash]"}.js`,
            library: isClient || isEdgeServer ? "_N_E" : undefined,
            libraryTarget: isClient || isEdgeServer ? "assign" : "commonjs2",
            hotUpdateChunkFilename: "static/webpack/[id].[fullhash].hot-update.js",
            hotUpdateMainFilename: "static/webpack/[fullhash].[runtime].hot-update.json",
            // This saves chunks with the name given via `import()`
            chunkFilename: isNodeOrEdgeCompilation ? "[name].js" : `static/chunks/${isDevFallback ? "fallback/" : ""}${dev ? "[name]" : "[name].[contenthash]"}.js`,
            strictModuleExceptionHandling: true,
            crossOriginLoading: crossOrigin,
            webassemblyModuleFilename: "static/wasm/[modulehash].wasm",
            hashFunction: "xxhash64",
            hashDigestLength: 16
        },
        performance: false,
        resolve: resolveConfig,
        resolveLoader: {
            // The loaders Next.js provides
            alias: [
                "error-loader",
                "next-swc-loader",
                "next-client-pages-loader",
                "next-image-loader",
                "next-metadata-image-loader",
                "next-style-loader",
                "next-flight-loader",
                "next-flight-client-entry-loader",
                "next-flight-action-entry-loader",
                "next-flight-client-module-loader",
                "empty-loader",
                "next-middleware-loader",
                "next-edge-function-loader",
                "next-edge-app-route-loader",
                "next-edge-ssr-loader",
                "next-middleware-asset-loader",
                "next-middleware-wasm-loader",
                "next-app-loader",
                "next-route-loader",
                "next-font-loader",
                "next-invalid-import-error-loader",
                "next-metadata-route-loader",
                "modularize-import-loader",
                "next-barrel-loader"
            ].reduce((alias, loader)=>{
                // using multiple aliases to replace `resolveLoader.modules`
                alias[loader] = _path.default.join(__dirname, "webpack", "loaders", loader);
                return alias;
            }, {}),
            modules: [
                "node_modules",
                ...nodePathList
            ],
            plugins: []
        },
        module: {
            rules: [
                // Alias server-only and client-only to proper exports based on bundling layers
                {
                    issuerLayer: {
                        or: [
                            ..._constants.WEBPACK_LAYERS.GROUP.server,
                            ..._constants.WEBPACK_LAYERS.GROUP.nonClientServerTarget
                        ]
                    },
                    resolve: {
                        // Error on client-only but allow server-only
                        alias: (0, _createcompileraliases.createServerOnlyClientOnlyAliases)(true)
                    }
                },
                {
                    issuerLayer: {
                        not: [
                            ..._constants.WEBPACK_LAYERS.GROUP.server,
                            ..._constants.WEBPACK_LAYERS.GROUP.nonClientServerTarget
                        ]
                    },
                    resolve: {
                        // Error on server-only but allow client-only
                        alias: (0, _createcompileraliases.createServerOnlyClientOnlyAliases)(false)
                    }
                },
                // Detect server-only / client-only imports and error in build time
                {
                    test: [
                        /^client-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]client-only[\\/]error/
                    ],
                    loader: "next-invalid-import-error-loader",
                    issuerLayer: {
                        or: _constants.WEBPACK_LAYERS.GROUP.server
                    },
                    options: {
                        message: "'client-only' cannot be imported from a Server Component module. It should only be used from a Client Component."
                    }
                },
                {
                    test: [
                        /^server-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]server-only[\\/]index/
                    ],
                    loader: "next-invalid-import-error-loader",
                    issuerLayer: {
                        not: [
                            ..._constants.WEBPACK_LAYERS.GROUP.server,
                            ..._constants.WEBPACK_LAYERS.GROUP.nonClientServerTarget
                        ]
                    },
                    options: {
                        message: "'server-only' cannot be imported from a Client Component module. It should only be used from a Server Component."
                    }
                },
                // Potential the bundle introduced into middleware and api can be poisoned by client-only
                // but not being used, so we disabled the `client-only` erroring on these layers.
                // `server-only` is still available.
                {
                    test: [
                        /^client-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]client-only[\\/]error/
                    ],
                    loader: "empty-loader",
                    issuerLayer: {
                        or: _constants.WEBPACK_LAYERS.GROUP.nonClientServerTarget
                    }
                },
                ...hasAppDir ? [
                    {
                        layer: _constants.WEBPACK_LAYERS.appRouteHandler,
                        test: new RegExp(`private-next-app-dir\\/.*\\/route\\.(${pageExtensions.join("|")})$`)
                    },
                    {
                        // Make sure that AsyncLocalStorage module instance is shared between server and client
                        // layers.
                        layer: _constants.WEBPACK_LAYERS.shared,
                        test: asyncStoragesRegex
                    },
                    // Convert metadata routes to separate layer
                    {
                        resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataRoute),
                        layer: _constants.WEBPACK_LAYERS.appMetadataRoute
                    },
                    {
                        // Ensure that the app page module is in the client layers, this
                        // enables React to work correctly for RSC.
                        layer: _constants.WEBPACK_LAYERS.serverSideRendering,
                        test: /next[\\/]dist[\\/](esm[\\/])?server[\\/]future[\\/]route-modules[\\/]app-page[\\/]module/
                    },
                    {
                        issuerLayer: _utils.isWebpackAppLayer,
                        resolve: {
                            alias: {
                                ...(0, _createcompileraliases.createNextApiEsmAliases)(),
                                ...(0, _createcompileraliases.createAppRouterApiAliases)()
                            }
                        }
                    }
                ] : [],
                ...hasAppDir && !isClient ? [
                    {
                        issuerLayer: _utils.isWebpackServerLayer,
                        test: {
                            // Resolve it if it is a source code file, and it has NOT been
                            // opted out of bundling.
                            and: [
                                codeCondition.test,
                                {
                                    not: [
                                        optOutBundlingPackageRegex,
                                        asyncStoragesRegex
                                    ]
                                }
                            ]
                        },
                        resolve: {
                            mainFields: (0, _resolve.getMainField)(compilerType, true),
                            conditionNames: reactServerCondition,
                            // If missing the alias override here, the default alias will be used which aliases
                            // react to the direct file path, not the package name. In that case the condition
                            // will be ignored completely.
                            alias: (0, _createcompileraliases.createRSCAliases)(bundledReactChannel, {
                                // No server components profiling
                                reactProductionProfiling,
                                layer: _constants.WEBPACK_LAYERS.reactServerComponents,
                                isEdgeServer
                            })
                        },
                        use: {
                            loader: "next-flight-loader"
                        }
                    }
                ] : [],
                // TODO: FIXME: do NOT webpack 5 support with this
                // x-ref: https://github.com/webpack/webpack/issues/11467
                ...!config.experimental.fullySpecified ? [
                    {
                        test: /\.m?js/,
                        resolve: {
                            fullySpecified: false
                        }
                    }
                ] : [],
                ...hasAppDir && isEdgeServer ? [
                    // The Edge bundle includes the server in its entrypoint, so it has to
                    // be in the SSR layer — here we convert the actual page request to
                    // the RSC layer via a webpack rule.
                    {
                        resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.edgeSSREntry),
                        layer: _constants.WEBPACK_LAYERS.reactServerComponents
                    }
                ] : [],
                ...hasAppDir ? [
                    {
                        // Alias react-dom for ReactDOM.preload usage.
                        // Alias react for switching between default set and share subset.
                        oneOf: [
                            {
                                exclude: asyncStoragesRegex,
                                issuerLayer: _utils.isWebpackServerLayer,
                                test: {
                                    // Resolve it if it is a source code file, and it has NOT been
                                    // opted out of bundling.
                                    and: [
                                        codeCondition.test,
                                        {
                                            not: [
                                                optOutBundlingPackageRegex
                                            ]
                                        }
                                    ]
                                },
                                resolve: {
                                    // It needs `conditionNames` here to require the proper asset,
                                    // when react is acting as dependency of compiled/react-dom.
                                    alias: (0, _createcompileraliases.createRSCAliases)(bundledReactChannel, {
                                        reactProductionProfiling,
                                        layer: _constants.WEBPACK_LAYERS.reactServerComponents,
                                        isEdgeServer
                                    })
                                }
                            },
                            {
                                test: codeCondition.test,
                                issuerLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                resolve: {
                                    alias: (0, _createcompileraliases.createRSCAliases)(bundledReactChannel, {
                                        reactProductionProfiling,
                                        layer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                        isEdgeServer
                                    })
                                }
                            }
                        ]
                    },
                    {
                        test: codeCondition.test,
                        issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                        resolve: {
                            alias: (0, _createcompileraliases.createRSCAliases)(bundledReactChannel, {
                                reactProductionProfiling,
                                layer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                                isEdgeServer
                            })
                        }
                    }
                ] : [],
                // Do not apply react-refresh-loader to node_modules for app router browser layer
                ...hasAppDir && dev && isClient ? [
                    {
                        test: codeCondition.test,
                        exclude: [
                            codeCondition.exclude,
                            transpilePackagesRegex
                        ],
                        issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                        use: reactRefreshLoaders,
                        resolve: {
                            mainFields: (0, _resolve.getMainField)(compilerType, true)
                        }
                    }
                ] : [],
                {
                    oneOf: [
                        {
                            ...codeCondition,
                            issuerLayer: _constants.WEBPACK_LAYERS.api,
                            parser: {
                                // Switch back to normal URL handling
                                url: true
                            },
                            use: apiRoutesLayerLoaders
                        },
                        {
                            test: codeCondition.test,
                            issuerLayer: _constants.WEBPACK_LAYERS.middleware,
                            use: middlewareLayerLoaders
                        },
                        ...hasAppDir ? [
                            {
                                test: codeCondition.test,
                                issuerLayer: _utils.isWebpackServerLayer,
                                exclude: asyncStoragesRegex,
                                use: appServerLayerLoaders
                            },
                            {
                                test: codeCondition.test,
                                resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.edgeSSREntry),
                                use: appServerLayerLoaders
                            },
                            {
                                test: codeCondition.test,
                                issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                                use: appBrowserLayerLoaders,
                                resolve: {
                                    mainFields: (0, _resolve.getMainField)(compilerType, true)
                                }
                            },
                            {
                                test: codeCondition.test,
                                issuerLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                use: appSSRLayerLoaders,
                                resolve: {
                                    mainFields: (0, _resolve.getMainField)(compilerType, true)
                                }
                            }
                        ] : [],
                        {
                            ...codeCondition,
                            use: [
                                ...reactRefreshLoaders,
                                defaultLoaders.babel
                            ]
                        }
                    ]
                },
                ...!config.images.disableStaticImages ? [
                    {
                        test: nextImageLoaderRegex,
                        loader: "next-image-loader",
                        issuer: {
                            not: _css.regexLikeCss
                        },
                        dependency: {
                            not: [
                                "url"
                            ]
                        },
                        resourceQuery: {
                            not: [
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadata),
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataRoute),
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataImageMeta)
                            ]
                        },
                        options: {
                            isDev: dev,
                            compilerType,
                            basePath: config.basePath,
                            assetPrefix: config.assetPrefix
                        }
                    }
                ] : [],
                ...isEdgeServer ? [
                    {
                        resolve: {
                            fallback: {
                                process: require.resolve("./polyfills/process")
                            }
                        }
                    }
                ] : isClient ? [
                    {
                        resolve: {
                            fallback: config.experimental.fallbackNodePolyfills === false ? {
                                assert: false,
                                buffer: false,
                                constants: false,
                                crypto: false,
                                domain: false,
                                http: false,
                                https: false,
                                os: false,
                                path: false,
                                punycode: false,
                                process: false,
                                querystring: false,
                                stream: false,
                                string_decoder: false,
                                sys: false,
                                timers: false,
                                tty: false,
                                util: false,
                                vm: false,
                                zlib: false,
                                events: false,
                                setImmediate: false
                            } : {
                                assert: require.resolve("next/dist/compiled/assert"),
                                buffer: require.resolve("next/dist/compiled/buffer/"),
                                constants: require.resolve("next/dist/compiled/constants-browserify"),
                                crypto: require.resolve("next/dist/compiled/crypto-browserify"),
                                domain: require.resolve("next/dist/compiled/domain-browser"),
                                http: require.resolve("next/dist/compiled/stream-http"),
                                https: require.resolve("next/dist/compiled/https-browserify"),
                                os: require.resolve("next/dist/compiled/os-browserify"),
                                path: require.resolve("next/dist/compiled/path-browserify"),
                                punycode: require.resolve("next/dist/compiled/punycode"),
                                process: require.resolve("./polyfills/process"),
                                // Handled in separate alias
                                querystring: require.resolve("next/dist/compiled/querystring-es3"),
                                stream: require.resolve("next/dist/compiled/stream-browserify"),
                                string_decoder: require.resolve("next/dist/compiled/string_decoder"),
                                sys: require.resolve("next/dist/compiled/util/"),
                                timers: require.resolve("next/dist/compiled/timers-browserify"),
                                tty: require.resolve("next/dist/compiled/tty-browserify"),
                                // Handled in separate alias
                                // url: require.resolve('url/'),
                                util: require.resolve("next/dist/compiled/util/"),
                                vm: require.resolve("next/dist/compiled/vm-browserify"),
                                zlib: require.resolve("next/dist/compiled/browserify-zlib"),
                                events: require.resolve("next/dist/compiled/events/"),
                                setImmediate: require.resolve("next/dist/compiled/setimmediate")
                            }
                        }
                    }
                ] : [],
                {
                    // Mark `image-response.js` as side-effects free to make sure we can
                    // tree-shake it if not used.
                    test: /[\\/]next[\\/]dist[\\/](esm[\\/])?server[\\/]og[\\/]image-response\.js/,
                    sideEffects: false
                },
                {
                    // This loader rule should be before other rules, as it can output code
                    // that still contains `"use client"` or `"use server"` statements that
                    // needs to be re-transformed by the RSC compilers.
                    // This loader rule works like a bridge between user's import and
                    // the target module behind a package's barrel file. It reads SWC's
                    // analysis result from the previous loader, and directly returns the
                    // code that only exports values that are asked by the user.
                    test: /__barrel_optimize__/,
                    use: ({ resourceQuery })=>{
                        var _resourceQuery_match;
                        const names = (((_resourceQuery_match = resourceQuery.match(/\?names=([^&]+)/)) == null ? void 0 : _resourceQuery_match[1]) || "").split(",");
                        return [
                            {
                                loader: "next-barrel-loader",
                                options: {
                                    names,
                                    swcCacheDir: _path.default.join(dir, (config == null ? void 0 : config.distDir) ?? ".next", "cache", "swc")
                                },
                                // This is part of the request value to serve as the module key.
                                // The barrel loader are no-op re-exported modules keyed by
                                // export names.
                                ident: "next-barrel-loader:" + resourceQuery
                            }
                        ];
                    }
                }
            ]
        },
        plugins: [
            isNodeServer && new _webpack.webpack.NormalModuleReplacementPlugin(/\.\/(.+)\.shared-runtime$/, function(resource) {
                const moduleName = _path.default.basename(resource.request, ".shared-runtime");
                const layer = resource.contextInfo.issuerLayer;
                let runtime;
                switch(layer){
                    case _constants.WEBPACK_LAYERS.appRouteHandler:
                        runtime = "app-route";
                        break;
                    case _constants.WEBPACK_LAYERS.serverSideRendering:
                    case _constants.WEBPACK_LAYERS.reactServerComponents:
                    case _constants.WEBPACK_LAYERS.appPagesBrowser:
                    case _constants.WEBPACK_LAYERS.actionBrowser:
                        runtime = "app-page";
                        break;
                    default:
                        runtime = "pages";
                }
                resource.request = `next/dist/server/future/route-modules/${runtime}/vendored/contexts/${moduleName}`;
            }),
            dev && new _memorywithgccacheplugin.MemoryWithGcCachePlugin({
                maxGenerations: 5
            }),
            dev && isClient && new _ReactRefreshWebpackPlugin.default(_webpack.webpack),
            // Makes sure `Buffer` and `process` are polyfilled in client and flight bundles (same behavior as webpack 4)
            (isClient || isEdgeServer) && new _webpack.webpack.ProvidePlugin({
                // Buffer is used by getInlineScriptSource
                Buffer: [
                    require.resolve("buffer"),
                    "Buffer"
                ],
                // Avoid process being overridden when in web run time
                ...isClient && {
                    process: [
                        require.resolve("process")
                    ]
                }
            }),
            (0, _defineenvplugin.getDefineEnvPlugin)({
                isTurbopack: false,
                allowedRevalidateHeaderKeys,
                clientRouterFilters,
                config,
                dev,
                distDir,
                fetchCacheKeyPrefix,
                hasRewrites,
                isClient,
                isEdgeServer,
                isNodeOrEdgeCompilation,
                isNodeServer,
                middlewareMatchers,
                previewModeId
            }),
            isClient && new _reactloadableplugin.ReactLoadablePlugin({
                filename: _constants1.REACT_LOADABLE_MANIFEST,
                pagesDir,
                runtimeAsset: `server/${_constants1.MIDDLEWARE_REACT_LOADABLE_MANIFEST}.js`,
                dev
            }),
            (isClient || isEdgeServer) && new _nextdropclientpageplugin.DropClientPage(),
            config.outputFileTracing && isNodeServer && !dev && new (require("./webpack/plugins/next-trace-entrypoints-plugin")).TraceEntryPointsPlugin({
                rootDir: dir,
                appDir: appDir,
                pagesDir: pagesDir,
                esmExternals: config.experimental.esmExternals,
                outputFileTracingRoot: config.experimental.outputFileTracingRoot,
                appDirEnabled: hasAppDir,
                turbotrace: config.experimental.turbotrace,
                optOutBundlingPackages,
                traceIgnores: config.experimental.outputFileTracingIgnores || []
            }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            config.excludeDefaultMomentLocales && new _webpack.webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            ...dev ? (()=>{
                // Even though require.cache is server only we have to clear assets from both compilations
                // This is because the client compilation generates the build manifest that's used on the server side
                const { NextJsRequireCacheHotReloader } = require("./webpack/plugins/nextjs-require-cache-hot-reloader");
                const devPlugins = [
                    new NextJsRequireCacheHotReloader({
                        serverComponents: hasAppDir
                    })
                ];
                if (isClient || isEdgeServer) {
                    devPlugins.push(new _webpack.webpack.HotModuleReplacementPlugin());
                }
                return devPlugins;
            })() : [],
            !dev && new _webpack.webpack.IgnorePlugin({
                resourceRegExp: /react-is/,
                contextRegExp: /next[\\/]dist[\\/]/
            }),
            isNodeOrEdgeCompilation && new _pagesmanifestplugin.default({
                dev,
                appDirEnabled: hasAppDir,
                isEdgeRuntime: isEdgeServer,
                distDir: !dev ? distDir : undefined
            }),
            // MiddlewarePlugin should be after DefinePlugin so  NEXT_PUBLIC_*
            // replacement is done before its process.env.* handling
            isEdgeServer && new _middlewareplugin.default({
                dev,
                sriEnabled: !dev && !!((_config_experimental_sri = config.experimental.sri) == null ? void 0 : _config_experimental_sri.algorithm)
            }),
            isClient && new _buildmanifestplugin.default({
                buildId,
                rewrites,
                isDevFallback,
                exportRuntime: true,
                appDirEnabled: hasAppDir
            }),
            new _profilingplugin.ProfilingPlugin({
                runWebpackSpan,
                rootDir: dir
            }),
            config.optimizeFonts && !dev && isNodeServer && function() {
                const { FontStylesheetGatheringPlugin } = require("./webpack/plugins/font-stylesheet-gathering-plugin");
                return new FontStylesheetGatheringPlugin({
                    adjustFontFallbacks: config.experimental.adjustFontFallbacks,
                    adjustFontFallbacksWithSizeAdjust: config.experimental.adjustFontFallbacksWithSizeAdjust
                });
            }(),
            new _wellknownerrorsplugin.WellKnownErrorsPlugin(),
            isClient && new _copyfileplugin.CopyFilePlugin({
                filePath: require.resolve("./polyfills/polyfill-nomodule"),
                cacheKey: "14.1.0",
                name: `static/chunks/polyfills${dev ? "" : "-[hash]"}.js`,
                minimize: false,
                info: {
                    [_constants1.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL]: 1,
                    // This file is already minified
                    minimized: true
                }
            }),
            hasAppDir && isClient && new _appbuildmanifestplugin.AppBuildManifestPlugin({
                dev
            }),
            hasAppDir && (isClient ? new _flightmanifestplugin.ClientReferenceManifestPlugin({
                dev,
                appDir
            }) : new _flightcliententryplugin.FlightClientEntryPlugin({
                appDir,
                dev,
                isEdgeServer
            })),
            hasAppDir && !isClient && new _nexttypesplugin.NextTypesPlugin({
                dir,
                distDir: config.distDir,
                appDir,
                dev,
                isEdgeServer,
                pageExtensions: config.pageExtensions,
                typedRoutes: enableTypedRoutes,
                originalRewrites,
                originalRedirects
            }),
            !dev && isClient && !!((_config_experimental_sri1 = config.experimental.sri) == null ? void 0 : _config_experimental_sri1.algorithm) && new _subresourceintegrityplugin.SubresourceIntegrityPlugin(config.experimental.sri.algorithm),
            isClient && new _nextfontmanifestplugin.NextFontManifestPlugin({
                appDir
            }),
            !dev && isClient && new (require("./webpack/plugins/telemetry-plugin")).TelemetryPlugin(new Map([
                [
                    "swcLoader",
                    useSWCLoader
                ],
                [
                    "swcMinify",
                    config.swcMinify
                ],
                [
                    "swcRelay",
                    !!((_config_compiler = config.compiler) == null ? void 0 : _config_compiler.relay)
                ],
                [
                    "swcStyledComponents",
                    !!((_config_compiler1 = config.compiler) == null ? void 0 : _config_compiler1.styledComponents)
                ],
                [
                    "swcReactRemoveProperties",
                    !!((_config_compiler2 = config.compiler) == null ? void 0 : _config_compiler2.reactRemoveProperties)
                ],
                [
                    "swcExperimentalDecorators",
                    !!(jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.experimentalDecorators)
                ],
                [
                    "swcRemoveConsole",
                    !!((_config_compiler3 = config.compiler) == null ? void 0 : _config_compiler3.removeConsole)
                ],
                [
                    "swcImportSource",
                    !!(jsConfig == null ? void 0 : (_jsConfig_compilerOptions1 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions1.jsxImportSource)
                ],
                [
                    "swcEmotion",
                    !!((_config_compiler4 = config.compiler) == null ? void 0 : _config_compiler4.emotion)
                ],
                [
                    "turbotrace",
                    !!config.experimental.turbotrace
                ],
                [
                    "transpilePackages",
                    !!config.transpilePackages
                ],
                [
                    "skipMiddlewareUrlNormalize",
                    !!config.skipMiddlewareUrlNormalize
                ],
                [
                    "skipTrailingSlashRedirect",
                    !!config.skipTrailingSlashRedirect
                ],
                [
                    "modularizeImports",
                    !!config.modularizeImports
                ],
                SWCBinaryTarget
            ].filter(Boolean)))
        ].filter(Boolean)
    };
    // Support tsconfig and jsconfig baseUrl
    // Only add the baseUrl if it's explicitly set in tsconfig/jsconfig
    if (resolvedBaseUrl && !resolvedBaseUrl.isImplicit) {
        var _webpackConfig_resolve_modules, _webpackConfig_resolve1;
        (_webpackConfig_resolve1 = webpackConfig.resolve) == null ? void 0 : (_webpackConfig_resolve_modules = _webpackConfig_resolve1.modules) == null ? void 0 : _webpackConfig_resolve_modules.push(resolvedBaseUrl.baseUrl);
    }
    (_webpackConfig_resolve = webpackConfig.resolve) == null ? void 0 : (_webpackConfig_resolve_plugins = _webpackConfig_resolve.plugins) == null ? void 0 : _webpackConfig_resolve_plugins.unshift(new _jsconfigpathsplugin.JsConfigPathsPlugin((jsConfig == null ? void 0 : (_jsConfig_compilerOptions2 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions2.paths) || {}, resolvedBaseUrl));
    const webpack5Config = webpackConfig;
    if (isEdgeServer) {
        var _webpack5Config_module_rules, _webpack5Config_module, _webpack5Config_module_rules1, _webpack5Config_module1, _webpack5Config_module_rules2, _webpack5Config_module2;
        (_webpack5Config_module = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules = _webpack5Config_module.rules) == null ? void 0 : _webpack5Config_module_rules.unshift({
            test: /\.wasm$/,
            loader: "next-middleware-wasm-loader",
            type: "javascript/auto",
            resourceQuery: /module/i
        });
        (_webpack5Config_module1 = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules1 = _webpack5Config_module1.rules) == null ? void 0 : _webpack5Config_module_rules1.unshift({
            dependency: "url",
            loader: "next-middleware-asset-loader",
            type: "javascript/auto",
            layer: _constants.WEBPACK_LAYERS.edgeAsset
        });
        (_webpack5Config_module2 = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules2 = _webpack5Config_module2.rules) == null ? void 0 : _webpack5Config_module_rules2.unshift({
            issuerLayer: _constants.WEBPACK_LAYERS.edgeAsset,
            type: "asset/source"
        });
    }
    webpack5Config.experiments = {
        layers: true,
        cacheUnaffected: true,
        buildHttp: Array.isArray(config.experimental.urlImports) ? {
            allowedUris: config.experimental.urlImports,
            cacheLocation: _path.default.join(dir, "next.lock/data"),
            lockfileLocation: _path.default.join(dir, "next.lock/lock.json")
        } : config.experimental.urlImports ? {
            cacheLocation: _path.default.join(dir, "next.lock/data"),
            lockfileLocation: _path.default.join(dir, "next.lock/lock.json"),
            ...config.experimental.urlImports
        } : undefined
    };
    webpack5Config.module.parser = {
        javascript: {
            url: "relative"
        }
    };
    webpack5Config.module.generator = {
        asset: {
            filename: "static/media/[name].[hash:8][ext]"
        }
    };
    if (!webpack5Config.output) {
        webpack5Config.output = {};
    }
    if (isClient) {
        webpack5Config.output.trustedTypes = "nextjs#bundler";
    }
    if (isClient || isEdgeServer) {
        webpack5Config.output.enabledLibraryTypes = [
            "assign"
        ];
    }
    // This enables managedPaths for all node_modules
    // and also for the unplugged folder when using yarn pnp
    // It also add the yarn cache to the immutable paths
    webpack5Config.snapshot = {};
    if (process.versions.pnp === "3") {
        webpack5Config.snapshot.managedPaths = [
            /^(.+?(?:[\\/]\.yarn[\\/]unplugged[\\/][^\\/]+)?[\\/]node_modules[\\/])/
        ];
    } else {
        webpack5Config.snapshot.managedPaths = [
            /^(.+?[\\/]node_modules[\\/])/
        ];
    }
    if (process.versions.pnp === "3") {
        webpack5Config.snapshot.immutablePaths = [
            /^(.+?[\\/]cache[\\/][^\\/]+\.zip[\\/]node_modules[\\/])/
        ];
    }
    if (dev) {
        if (!webpack5Config.optimization) {
            webpack5Config.optimization = {};
        }
        // For Server Components, it's necessary to have provided exports collected
        // to generate the correct flight manifest.
        if (!hasAppDir) {
            webpack5Config.optimization.providedExports = false;
        }
        webpack5Config.optimization.usedExports = false;
    }
    const configVars = JSON.stringify({
        crossOrigin: config.crossOrigin,
        pageExtensions: pageExtensions,
        trailingSlash: config.trailingSlash,
        buildActivity: config.devIndicators.buildActivity,
        buildActivityPosition: config.devIndicators.buildActivityPosition,
        productionBrowserSourceMaps: !!config.productionBrowserSourceMaps,
        reactStrictMode: config.reactStrictMode,
        optimizeFonts: config.optimizeFonts,
        optimizeCss: config.experimental.optimizeCss,
        nextScriptWorkers: config.experimental.nextScriptWorkers,
        scrollRestoration: config.experimental.scrollRestoration,
        typedRoutes: config.experimental.typedRoutes,
        basePath: config.basePath,
        excludeDefaultMomentLocales: config.excludeDefaultMomentLocales,
        assetPrefix: config.assetPrefix,
        disableOptimizedLoading,
        isEdgeRuntime: isEdgeServer,
        reactProductionProfiling,
        webpack: !!config.webpack,
        hasRewrites,
        swcMinify: config.swcMinify,
        swcLoader: useSWCLoader,
        removeConsole: (_config_compiler5 = config.compiler) == null ? void 0 : _config_compiler5.removeConsole,
        reactRemoveProperties: (_config_compiler6 = config.compiler) == null ? void 0 : _config_compiler6.reactRemoveProperties,
        styledComponents: (_config_compiler7 = config.compiler) == null ? void 0 : _config_compiler7.styledComponents,
        relay: (_config_compiler8 = config.compiler) == null ? void 0 : _config_compiler8.relay,
        emotion: (_config_compiler9 = config.compiler) == null ? void 0 : _config_compiler9.emotion,
        modularizeImports: config.modularizeImports,
        imageLoaderFile: config.images.loaderFile
    });
    const cache = {
        type: "filesystem",
        // Disable memory cache in development in favor of our own MemoryWithGcCachePlugin.
        maxMemoryGenerations: dev ? 0 : Infinity,
        // Includes:
        //  - Next.js location on disk (some loaders use absolute paths and some resolve options depend on absolute paths)
        //  - Next.js version
        //  - next.config.js keys that affect compilation
        version: `${__dirname}|${"14.1.0"}|${configVars}`,
        cacheDirectory: _path.default.join(distDir, "cache", "webpack"),
        // For production builds, it's more efficient to compress all cache files together instead of compression each one individually.
        // So we disable compression here and allow the build runner to take care of compressing the cache as a whole.
        // For local development, we still want to compress the cache files individually to avoid I/O bottlenecks
        // as we are seeing 1~10 seconds of fs I/O time from user reports.
        compression: dev ? "gzip" : false
    };
    // Adds `next.config.js` as a buildDependency when custom webpack config is provided
    if (config.webpack && config.configFile) {
        cache.buildDependencies = {
            config: [
                config.configFile
            ]
        };
    }
    webpack5Config.cache = cache;
    if (process.env.NEXT_WEBPACK_LOGGING) {
        const infra = process.env.NEXT_WEBPACK_LOGGING.includes("infrastructure");
        const profileClient = process.env.NEXT_WEBPACK_LOGGING.includes("profile-client");
        const profileServer = process.env.NEXT_WEBPACK_LOGGING.includes("profile-server");
        const summaryClient = process.env.NEXT_WEBPACK_LOGGING.includes("summary-client");
        const summaryServer = process.env.NEXT_WEBPACK_LOGGING.includes("summary-server");
        const profile = profileClient && isClient || profileServer && isNodeOrEdgeCompilation;
        const summary = summaryClient && isClient || summaryServer && isNodeOrEdgeCompilation;
        const logDefault = !infra && !profile && !summary;
        if (logDefault || infra) {
            webpack5Config.infrastructureLogging = {
                level: "verbose",
                debug: /FileSystemInfo/
            };
        }
        if (logDefault || profile) {
            webpack5Config.plugins.push((compiler)=>{
                compiler.hooks.done.tap("next-webpack-logging", (stats)=>{
                    console.log(stats.toString({
                        colors: true,
                        logging: logDefault ? "log" : "verbose"
                    }));
                });
            });
        } else if (summary) {
            webpack5Config.plugins.push((compiler)=>{
                compiler.hooks.done.tap("next-webpack-logging", (stats)=>{
                    console.log(stats.toString({
                        preset: "summary",
                        colors: true,
                        timings: true
                    }));
                });
            });
        }
        if (profile) {
            const ProgressPlugin = _webpack.webpack.ProgressPlugin;
            webpack5Config.plugins.push(new ProgressPlugin({
                profile: true
            }));
            webpack5Config.profile = true;
        }
    }
    webpackConfig = await (0, _config.buildConfiguration)(webpackConfig, {
        supportedBrowsers,
        rootDirectory: dir,
        customAppFile: pagesDir ? new RegExp((0, _escaperegexp.escapeStringRegexp)(_path.default.join(pagesDir, `_app`))) : undefined,
        hasAppDir,
        isDevelopment: dev,
        isServer: isNodeOrEdgeCompilation,
        isEdgeRuntime: isEdgeServer,
        targetWeb: isClient || isEdgeServer,
        assetPrefix: config.assetPrefix || "",
        sassOptions: config.sassOptions,
        productionBrowserSourceMaps: config.productionBrowserSourceMaps,
        future: config.future,
        experimental: config.experimental,
        disableStaticImages: config.images.disableStaticImages,
        transpilePackages: config.transpilePackages,
        serverSourceMaps: config.experimental.serverSourceMaps
    });
    // @ts-ignore Cache exists
    webpackConfig.cache.name = `${webpackConfig.name}-${webpackConfig.mode}${isDevFallback ? "-fallback" : ""}`;
    if (dev) {
        if (webpackConfig.module) {
            webpackConfig.module.unsafeCache = (module1)=>!UNSAFE_CACHE_REGEX.test(module1.resource);
        } else {
            webpackConfig.module = {
                unsafeCache: (module1)=>!UNSAFE_CACHE_REGEX.test(module1.resource)
            };
        }
    }
    let originalDevtool = webpackConfig.devtool;
    if (typeof config.webpack === "function") {
        var _webpack5Config_experiments, _webpack5Config_experiments1;
        webpackConfig = config.webpack(webpackConfig, {
            dir,
            dev,
            isServer: isNodeOrEdgeCompilation,
            buildId,
            config,
            defaultLoaders,
            totalPages: Object.keys(entrypoints).length,
            webpack: _webpack.webpack,
            ...isNodeOrEdgeCompilation ? {
                nextRuntime: isEdgeServer ? "edge" : "nodejs"
            } : {}
        });
        if (!webpackConfig) {
            throw new Error(`Webpack config is undefined. You may have forgot to return properly from within the "webpack" method of your ${config.configFileName}.\n` + "See more info here https://nextjs.org/docs/messages/undefined-webpack-config");
        }
        if (dev && originalDevtool !== webpackConfig.devtool) {
            webpackConfig.devtool = originalDevtool;
            devtoolRevertWarning(originalDevtool);
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const webpack5Config = webpackConfig;
        // disable lazy compilation of entries as next.js has it's own method here
        if (((_webpack5Config_experiments = webpack5Config.experiments) == null ? void 0 : _webpack5Config_experiments.lazyCompilation) === true) {
            webpack5Config.experiments.lazyCompilation = {
                entries: false
            };
        } else if (typeof ((_webpack5Config_experiments1 = webpack5Config.experiments) == null ? void 0 : _webpack5Config_experiments1.lazyCompilation) === "object" && webpack5Config.experiments.lazyCompilation.entries !== false) {
            webpack5Config.experiments.lazyCompilation.entries = false;
        }
        if (typeof webpackConfig.then === "function") {
            console.warn("> Promise returned in next config. https://nextjs.org/docs/messages/promise-in-next-config");
        }
    }
    if (!config.images.disableStaticImages) {
        var _webpackConfig_module2;
        const rules = ((_webpackConfig_module2 = webpackConfig.module) == null ? void 0 : _webpackConfig_module2.rules) || [];
        const hasCustomSvg = rules.some((rule)=>rule && typeof rule === "object" && rule.loader !== "next-image-loader" && "test" in rule && rule.test instanceof RegExp && rule.test.test(".svg"));
        const nextImageRule = rules.find((rule)=>rule && typeof rule === "object" && rule.loader === "next-image-loader");
        if (hasCustomSvg && nextImageRule && nextImageRule && typeof nextImageRule === "object") {
            // Exclude svg if the user already defined it in custom
            // webpack config such as `@svgr/webpack` plugin or
            // the `babel-plugin-inline-react-svg` plugin.
            nextImageRule.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i;
        }
    }
    if (config.experimental.craCompat && ((_webpackConfig_module = webpackConfig.module) == null ? void 0 : _webpackConfig_module.rules) && webpackConfig.plugins) {
        // CRA allows importing non-webpack handled files with file-loader
        // these need to be the last rule to prevent catching other items
        // https://github.com/facebook/create-react-app/blob/fddce8a9e21bf68f37054586deb0c8636a45f50b/packages/react-scripts/config/webpack.config.js#L594
        const fileLoaderExclude = [
            /\.(js|mjs|jsx|ts|tsx|json)$/
        ];
        const fileLoader = {
            exclude: fileLoaderExclude,
            issuer: fileLoaderExclude,
            type: "asset/resource"
        };
        const topRules = [];
        const innerRules = [];
        for (const rule of webpackConfig.module.rules){
            if (!rule || typeof rule !== "object") continue;
            if (rule.resolve) {
                topRules.push(rule);
            } else {
                if (rule.oneOf && !(rule.test || rule.exclude || rule.resource || rule.issuer)) {
                    rule.oneOf.forEach((r)=>innerRules.push(r));
                } else {
                    innerRules.push(rule);
                }
            }
        }
        webpackConfig.module.rules = [
            ...topRules,
            {
                oneOf: [
                    ...innerRules,
                    fileLoader
                ]
            }
        ];
    }
    // Backwards compat with webpack-dev-middleware options object
    if (typeof config.webpackDevMiddleware === "function") {
        const options = config.webpackDevMiddleware({
            watchOptions: webpackConfig.watchOptions
        });
        if (options.watchOptions) {
            webpackConfig.watchOptions = options.watchOptions;
        }
    }
    function canMatchCss(rule) {
        if (!rule) {
            return false;
        }
        const fileNames = [
            "/tmp/NEXTJS_CSS_DETECTION_FILE.css",
            "/tmp/NEXTJS_CSS_DETECTION_FILE.scss",
            "/tmp/NEXTJS_CSS_DETECTION_FILE.sass",
            "/tmp/NEXTJS_CSS_DETECTION_FILE.less",
            "/tmp/NEXTJS_CSS_DETECTION_FILE.styl"
        ];
        if (rule instanceof RegExp && fileNames.some((input)=>rule.test(input))) {
            return true;
        }
        if (typeof rule === "function") {
            if (fileNames.some((input)=>{
                try {
                    if (rule(input)) {
                        return true;
                    }
                } catch  {}
                return false;
            })) {
                return true;
            }
        }
        if (Array.isArray(rule) && rule.some(canMatchCss)) {
            return true;
        }
        return false;
    }
    const hasUserCssConfig = ((_webpackConfig_module1 = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules = _webpackConfig_module1.rules) == null ? void 0 : _webpackConfig_module_rules.some((rule)=>canMatchCss(rule.test) || canMatchCss(rule.include))) ?? false;
    if (hasUserCssConfig) {
        var _webpackConfig_module_rules1, _webpackConfig_module3, _webpackConfig_plugins, _webpackConfig_optimization_minimizer, _webpackConfig_optimization;
        // only show warning for one build
        if (isNodeOrEdgeCompilation) {
            console.warn((0, _picocolors.yellow)((0, _picocolors.bold)("Warning: ")) + (0, _picocolors.bold)("Built-in CSS support is being disabled due to custom CSS configuration being detected.\n") + "See here for more info: https://nextjs.org/docs/messages/built-in-css-disabled\n");
        }
        if ((_webpackConfig_module3 = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules1 = _webpackConfig_module3.rules) == null ? void 0 : _webpackConfig_module_rules1.length) {
            // Remove default CSS Loaders
            webpackConfig.module.rules.forEach((r)=>{
                if (!r || typeof r !== "object") return;
                if (Array.isArray(r.oneOf)) {
                    r.oneOf = r.oneOf.filter((o)=>o[Symbol.for("__next_css_remove")] !== true);
                }
            });
        }
        if ((_webpackConfig_plugins = webpackConfig.plugins) == null ? void 0 : _webpackConfig_plugins.length) {
            // Disable CSS Extraction Plugin
            webpackConfig.plugins = webpackConfig.plugins.filter((p)=>p.__next_css_remove !== true);
        }
        if ((_webpackConfig_optimization = webpackConfig.optimization) == null ? void 0 : (_webpackConfig_optimization_minimizer = _webpackConfig_optimization.minimizer) == null ? void 0 : _webpackConfig_optimization_minimizer.length) {
            // Disable CSS Minifier
            webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter((e)=>e.__next_css_remove !== true);
        }
    }
    // Inject missing React Refresh loaders so that development mode is fast:
    if (dev && isClient) {
        attachReactRefresh(webpackConfig, defaultLoaders.babel);
    }
    // Backwards compat for `main.js` entry key
    // and setup of dependencies between entries
    // we can't do that in the initial entry for
    // backward-compat reasons
    const originalEntry = webpackConfig.entry;
    if (typeof originalEntry !== "undefined") {
        const updatedEntry = async ()=>{
            const entry = typeof originalEntry === "function" ? await originalEntry() : originalEntry;
            // Server compilation doesn't have main.js
            if (clientEntries && Array.isArray(entry["main.js"]) && entry["main.js"].length > 0) {
                const originalFile = clientEntries[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN];
                entry[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN] = [
                    ...entry["main.js"],
                    originalFile
                ];
            }
            delete entry["main.js"];
            for (const name of Object.keys(entry)){
                entry[name] = (0, _entries.finalizeEntrypoint)({
                    value: entry[name],
                    compilerType,
                    name,
                    hasAppDir
                });
            }
            return entry;
        };
        // @ts-ignore webpack 5 typings needed
        webpackConfig.entry = updatedEntry;
    }
    if (!dev && typeof webpackConfig.entry === "function") {
        // entry is always a function
        webpackConfig.entry = await webpackConfig.entry();
    }
    return webpackConfig;
}

//# sourceMappingURL=webpack-config.js.map