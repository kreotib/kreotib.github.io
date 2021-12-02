/*!
 * dist/jquery.inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2019 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.295
 */
!function webpackUniversalModuleDefinition(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(require("jquery")); else if ("function" == typeof define && define.amd) define(["jquery"], factory); else {
        var a = "object" == typeof exports ? factory(require("jquery")) : factory(root.jQuery);
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i]
    }
}(window, function (__WEBPACK_EXTERNAL_MODULE__3__) {
    return modules = [function (module) {
        module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17}')
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(2), window = __webpack_require__(4), document = window.document,
            generateMaskSet = __webpack_require__(5).generateMaskSet, analyseMask = __webpack_require__(5).analyseMask,
            maskScope = __webpack_require__(8);

        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts), this.isRTL = this.opts.numericInput)
        }

        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1)
        }

        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData)
            }

            if (!0 === opts.importDataAttributes) {
                var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;
                if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) if ("alias" === p.toLowerCase()) {
                    optionData = dataoptions[p];
                    break
                }
                for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
                    if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break
                    }
                    importOption(option, optionData)
                }
            }
            return $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length
        }

        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: ["[", "]"],
                quantifiermarker: ["{", "}"],
                groupmarker: ["(", ")"],
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !1,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                insertModeVisual: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                _radixDance: !1,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: ["text", "tel", "url", "password", "search"],
                ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
                isComplete: null,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: void 0,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                importDataAttributes: !0,
                shiftPositions: !0
            },
            definitions: {
                9: {validator: "[0-9\uff11-\uff19]", definitionSymbol: "*"},
                a: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", definitionSymbol: "*"},
                "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"}
            },
            aliases: {},
            masksCache: {},
            mask: function mask(elems) {
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {action: "mask"}))
                    }
                }), elems && elems[0] && elems[0].inputmask || this
            },
            option: function option(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0
            },
            unmaskedvalue: function unmaskedvalue(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                })
            },
            remove: function remove() {
                return maskScope.call(this, {action: "remove"})
            },
            getemptymask: function getemptymask() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getemptymask"})
            },
            hasMaskedValue: function hasMaskedValue() {
                return !this.opts.autoUnmask
            },
            isComplete: function isComplete() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "isComplete"})
            },
            getmetadata: function getmetadata() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {action: "getmetadata"})
            },
            isValid: function isValid(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "isValid",
                    value: value
                })
            },
            format: function format(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                })
            },
            setValue: function setValue(value) {
                this.el && $(this.el).trigger("setvalue", [value])
            },
            analyseMask: analyseMask
        }, Inputmask.extendDefaults = function (options) {
            $.extend(!0, Inputmask.prototype.defaults, options)
        }, Inputmask.extendDefinitions = function (definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition)
        }, Inputmask.extendAliases = function (alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias)
        }, Inputmask.format = function (value, options, metadata) {
            return Inputmask(options).format(value, metadata)
        }, Inputmask.unmask = function (value, options) {
            return Inputmask(options).unmaskedvalue(value)
        }, Inputmask.isValid = function (value, options) {
            return Inputmask(options).isValid(value)
        }, Inputmask.remove = function (elems) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask && el.inputmask.remove()
            })
        }, Inputmask.setValue = function (elems, value) {
            "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
                el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [value])
            })
        };
        var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
        Inputmask.escapeRegex = function (str) {
            return str.replace(escapeRegexRegex, "\\$1")
        }, Inputmask.dependencyLib = $, window.Inputmask = Inputmask, module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var jquery = __webpack_require__(3);
        if (void 0 === jquery) throw"jQuery not loaded!";
        module.exports = jquery
    }, function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__3__
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var __WEBPACK_AMD_DEFINE_RESULT__;

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window
        }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(2);

        function generateMaskSet(opts, nocache) {
            var ms;

            function generateMask(mask, metadata, opts) {
                var regexMask = !1, masksetDefinition, maskdefKey;
                if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1]
                }
                return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: void 0,
                    buffer: void 0,
                    tests: {},
                    excludes: {},
                    metadata: metadata,
                    maskLength: void 0,
                    jitOffset: {}
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition
            }

            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (1 < opts.mask.length) {
                    if (null === opts.keepStatic) {
                        opts.keepStatic = "auto";
                        for (var i = 0; i < opts.mask.length; i++) if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                            opts.keepStatic = !0;
                            break
                        }
                    }
                    var altMask = opts.groupmarker[0];
                    return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
                        1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 === msk.mask || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask
                    }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts)
                }
                opts.mask = opts.mask.pop()
            }
            return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms
        }

        function analyseMask(mask, regexMask, opts) {
            var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                escaped = !1, currentToken = new MaskToken, match, m, openenings = [], maskTokens = [], openingToken,
                currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;

            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
                    min: 1,
                    max: 1
                }
            }

            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, opts.casing ? "i" : ""),
                    static: !1,
                    optionality: !1,
                    newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    nativeDef: element
                }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
                    prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    })
                })), escaped = !1; else {
                    var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
                    maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                            this.test = maskdef.validator
                        } : new RegExp("."),
                        static: !1,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element
                    }) : (mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
                        casing: null,
                        def: opts.staticDefinitionSymbol || element,
                        placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                        nativeDef: (escaped ? "'" : "") + element
                    }), escaped = !1)
                }
            }

            function verifyGroupMarker(maskToken) {
                maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
                    var nextToken = maskToken.matches[ndx + 1];
                    (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token)
                })
            }

            function defaultCase() {
                if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else insertTestDefinition(currentToken, m)
            }

            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st
                }

                for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt)
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match])
                }
                return maskToken
            }

            function groupify(matches) {
                var groupToken = new MaskToken(!0);
                return groupToken.openGroup = !1, groupToken.matches = matches, groupToken
            }

            function closeGroup() {
                if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) if (0 < openenings.length) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
                        0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
                    }
                } else currentToken.matches.push(openingToken); else defaultCase()
            }

            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch
            }

            for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
                if (m = match[0], regexMask) switch (m.charAt(0)) {
                    case"?":
                        m = "{0,1}";
                        break;
                    case"+":
                    case"*":
                        m = "{" + m + "}";
                        break;
                    case"|":
                        if (0 === openenings.length) {
                            var altRegexGroup = groupify(currentToken.matches);
                            altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0
                        }
                        break
                }
                if (escaped) defaultCase(); else switch (m.charAt(0)) {
                    case"(?=":
                        break;
                    case"(?!":
                        break;
                    case"(?<=":
                        break;
                    case"(?<!":
                        break;
                    case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;
                    case opts.optionalmarker[1]:
                    case opts.groupmarker[1]:
                        closeGroup();
                        break;
                    case opts.optionalmarker[0]:
                        openenings.push(new MaskToken(!1, !0));
                        break;
                    case opts.groupmarker[0]:
                        openenings.push(new MaskToken(!0));
                        break;
                    case opts.quantifiermarker[0]:
                        var quantifier = new MaskToken(!1, !1, !0);
                        m = m.replace(/[{}]/g, "");
                        var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                            mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1,
                            jit: mqj[1]
                        };
                        var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
                        if (match = matches.pop(), match.isAlternator) {
                            matches.push(match), matches = match.matches;
                            var groupToken = new MaskToken(!0), tmpMatch = matches.pop();
                            matches.push(groupToken), matches = groupToken.matches, match = tmpMatch
                        }
                        match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
                        break;
                    case opts.alternatormarker:
                        if (0 < openenings.length) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches)
                        } else lastMatch = groupQuantifier(currentToken.matches);
                        if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup)
                        }
                        break;
                    default:
                        defaultCase()
                }
            }
            for (closeRegexGroup && closeGroup(); 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
            return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens
        }

        module.exports = {generateMaskSet: generateMaskSet, analyseMask: analyseMask}
    }, function (module, exports, __webpack_require__) {
        "use strict";
        __webpack_require__(7), __webpack_require__(9), __webpack_require__(10), module.exports = __webpack_require__(1)
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(1);
        Inputmask.extendDefinitions({
            A: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "&": {validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper"},
            "#": {validator: "[0-9A-Fa-f]", casing: "upper"}
        });
        var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

        function ipValidator(chrs, maskset, pos, strict, opts) {
            return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs)
        }

        Inputmask.extendAliases({
            cssunit: {regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"},
            url: {regex: "(https?|ftp)//.*", autoUnmask: !1},
            ip: {
                mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                definitions: {
                    i: {validator: ipValidator},
                    j: {validator: ipValidator},
                    k: {validator: ipValidator},
                    l: {validator: ipValidator}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                casing: "lower",
                onBeforePaste: function onBeforePaste(pastedValue, opts) {
                    return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "")
                },
                definitions: {
                    "*": {validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"},
                    "-": {validator: "[0-9A-Za-z-]"}
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return maskedValue
                },
                inputmode: "email"
            },
            mac: {mask: "##:##:##:##:##:##"},
            vin: {
                mask: "V{13}9{4}",
                definitions: {V: {validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper"}},
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(2), window = __webpack_require__(4), document = window.document,
            ua = window.navigator && window.navigator.userAgent || "",
            ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"), mobile = "ontouchstart" in window,
            iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile, keyCode = __webpack_require__(0);
        module.exports = function maskScope(actionObj, maskset, opts) {
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var inputmask = this, el = this.el, isRTL = this.isRTL || (this.isRTL = opts.numericInput), undoValue, $el,
                skipKeyPressEvent = !1, skipInputEvent = !1, validationEvent = !1, ignorable = !1, maxLength,
                mouseEnter = !1, originalPlaceholder = void 0;

            function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
                var greedy = opts.greedy;
                clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
                var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos;
                do {
                    if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test)); else {
                        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
                        var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
                        (!1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))
                    }
                    "auto" === opts.keepStatic && test.newBlockMarker && !0 !== test.static && (opts.keepStatic = pos - 1), pos++
                } while ((void 0 === maxLength || pos < maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate
            }

            function resetMaskSet(soft) {
                maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0)
            }

            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1, after = -1, valids = validPositions || maskset.validPositions;
                for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx))
                }
                return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after
            }

            function getDecisionTaker(tst) {
                var decisionTaker = tst.locator[tst.alternation];
                return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : ""
            }

            function getLocator(tst, align) {
                var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
                if ("" !== locator) for (; locator.length < align;) locator += "0";
                return locator
            }

            function determineTestTemplate(pos, tests) {
                pos = 0 < pos ? pos - 1 : 0;
                for (var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
                    var tst = tests[ndx];
                    tstLocator = getLocator(tst, targetLocator.length);
                    var distance = Math.abs(tstLocator - targetLocator);
                    (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst)
                }
                return bestMatch
            }

            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs))
            }

            function getTest(pos, tests) {
                return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests(pos))[0]
            }

            function positionCanMatchDefinition(pos, testDefinition, opts) {
                for (var valid = !1, tests = getTests(pos), defProp = opts.shiftPositions ? "def" : "nativeDef", tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
                    valid = !0;
                    break
                }
                return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts)), valid
            }

            function getTests(pos, ndxIntlzr, tstPs) {
                var maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0,
                    ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0], matches = [], insertStop = !1, latestMatch,
                    cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), firstMatch) return !1
                            }), firstMatch
                        }

                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if ((maskset.tests[pos] || maskset.validPositions[pos]) && $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
                                if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                                var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                                    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos)
                            }), bestMatch) {
                                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                                    locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                                return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1)
                            }
                            return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0
                        }

                        function isSubsetOf(source, target) {
                            function expand(pattern) {
                                for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start)); else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
                                return expanded.join("")
                            }

                            return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")))
                        }

                        function staticCanMatchDefinition(source, target) {
                            return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1)
                        }

                        function setMergeLocators(targetMatch, altMatch) {
                            if (void 0 === altMatch || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                                targetMatch.mloc = targetMatch.mloc || {};
                                var locNdx = targetMatch.locator[targetMatch.alternation];
                                if (void 0 !== locNdx) {
                                    if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                                        for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                                        targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",")
                                    }
                                    return !0
                                }
                                targetMatch.alternation = void 0
                            }
                            return !1
                        }

                        if (500 < testPos && void 0 !== quantifierRecurse) throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                        if (testPos === pos && void 0 === match.matches) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        }), !0;
                        if (void 0 !== match.matches) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse), match) return !0
                            } else if (match.isOptional) {
                                var optionalToken = match, mtchsNdx = matches.length;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                                    if ($.each(matches, function (ndx, mtch) {
                                        mtchsNdx <= ndx && (mtch.match.optionality = !0)
                                    }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos
                                }
                            } else if (match.isAlternator) {
                                var alternateToken = match, malternateMatches = [], maltMatches,
                                    currentMatches = matches.slice(), loopNdxCnt = loopNdx.length,
                                    altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(),
                                        altIndexArr = [], amndx;
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                                    if (void 0 !== maskset.excludes[pos]) {
                                        for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = maskset.excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                                        0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone)
                                    }
                                    (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                                    for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1], dropMatch = !1;
                                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || void 0 !== altMatch.alternation && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                                        dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                    if (isSubsetOf(altMatch2, altMatch)) {
                                                        setMergeLocators(altMatch2, altMatch);
                                                        break
                                                    }
                                                    if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                                        setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch)
                                        }
                                    }
                                    matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice()
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                if (match) return !0
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                        insertStop = !0, testPos = pos;
                                        break
                                    }
                                    return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0
                        } else testPos++
                    }

                    for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                        var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) return match;
                        if (pos < testPos) break
                    }
                }

                function mergeLocators(pos, tests) {
                    var locator = [];
                    return $.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate(pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
                        if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i])
                    })), locator
                }

                if (-1 < pos && (void 0 === maxLength || pos < maxLength)) {
                    if (void 0 === ndxIntlzr) {
                        for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) previousPos--;
                        void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos)
                    }
                    if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                        var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                        if (match && testPos === pos || pos < testPos) break
                    }
                }
                return 0 !== matches.length && !insertStop || matches.push({
                    match: {
                        fn: null,
                        static: !0,
                        optionality: !1,
                        casing: null,
                        def: "",
                        placeholder: ""
                    }, locator: [], mloc: {}, cd: cacheDependency
                }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos])
            }

            function getBufferTemplate() {
                return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate(!1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer
            }

            function getBuffer(noCache) {
                return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate(!0, getLastValidPosition(), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer
            }

            function refreshFromBuffer(start, end, buffer) {
                var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
                    bffr = isRTL ? buffer.slice().reverse() : buffer;
                if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet(), maskset.tests = {}, start = 0, end = buffer.length, p = determineNewCaretPosition({
                    begin: 0,
                    end: 0
                }, !1); else {
                    for (i = start; i < end; i++) delete maskset.validPositions[i];
                    p = start
                }
                var keypress = new $.Event("keypress");
                for (i = start; i < end; i++) {
                    keypress.which = bffr[i].toString().charCodeAt(0), ignorable = !1;
                    var valResult = EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
                    !1 !== valResult && (p = valResult.forwardPosition)
                }
                opts.skipOptionalPartCharacter = skipOptionalPartCharacter
            }

            function casing(elem, test, pos) {
                switch (opts.casing || test.casing) {
                    case"upper":
                        elem = elem.toUpperCase();
                        break;
                    case"lower":
                        elem = elem.toLowerCase();
                        break;
                    case"title":
                        var posBefore = maskset.validPositions[pos - 1];
                        elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                        break;
                    default:
                        if ($.isFunction(opts.casing)) {
                            var args = Array.prototype.slice.call(arguments);
                            args.push(maskset.validPositions), elem = opts.casing.apply(this, args)
                        }
                }
                return elem
            }

            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                    isMatch = !0;
                    break
                }
                return isMatch
            }

            function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
                var validPsClone = $.extend(!0, {}, maskset.validPositions), tstClone = $.extend(!0, {}, maskset.tests),
                    lastAlt, alternation, isValidRslt = !1, returnRslt = !1, altPos, prevAltPos, i, validPos,
                    decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition(), nextPos, input, begin,
                    end;
                if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest(lastAlt), alternation = prevAltPos.alternation; else for (; 0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
                    if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                    lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos
                }
                if (void 0 !== alternation) {
                    decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
                    var validInputs = [], resultPos = -1;
                    for (i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
                    for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
                        for (maskset.tests = {}, resetMaskSet(!0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition(void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid(nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 1 == maskPos && isValidRslt && (returnRslt = {caretPos: i});
                        if (isValidRslt) break;
                        if (resetMaskSet(), prevAltPos = getTest(decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        var decisionTaker = getDecisionTaker(prevAltPos);
                        if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker)) {
                            returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break
                        }
                        for (maskset.excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) delete maskset.validPositions[i]
                    }
                }
                return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], returnRslt
            }

            function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    return isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1
                }

                strict = !0 === strict;
                var maskPos = pos;

                function processCommandObject(commandObj) {
                    if (void 0 !== commandObj) {
                        if (void 0 !== commandObj.remove && ($.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), $.each(commandObj.remove.sort(function (a, b) {
                            return b.pos - a.pos
                        }), function (ndx, lmnt) {
                            revalidateMask({begin: lmnt, end: lmnt + 1})
                        }), commandObj.remove = void 0), void 0 !== commandObj.insert && ($.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), $.each(commandObj.insert.sort(function (a, b) {
                            return a.pos - b.pos
                        }), function (ndx, lmnt) {
                            "" !== lmnt.c && isValid(lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid)
                        }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
                            var refresh = commandObj.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0
                        }
                        void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0)
                    }
                    return commandObj
                }

                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function (ndx, tst) {
                        var test = tst.match;
                        if (getBuffer(!0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        }, !1 !== rslt) {
                            var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                            return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder(position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (!1 === revalidateMask(pos, $.extend({}, tst, {input: casing(elem, test, validatedPos)}), fromIsValid, validatedPos) && (rslt = !1), !1)
                        }
                    }), rslt
                }

                void 0 !== pos.begin && (maskPos = isRTL ? pos.end : pos.begin);
                var result = !0, positionsClone = $.extend(!0, {}, maskset.validPositions);
                if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, delete maskset.tests[i]);
                if ($.isFunction(opts.preValidation) && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), result = processCommandObject(result)), !0 === result) {
                    if (void 0 === maxLength || maskPos < maxLength) {
                        if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
                            var currentPosValid = maskset.validPositions[maskPos];
                            if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                                if (opts.insertMode || void 0 === maskset.validPositions[seekNext(maskPos)] || pos.end > maskPos) {
                                    var skip = !1;
                                    if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext(maskPos)] && (result = isValid(maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), !1 !== result) {
                                        result = trackbackPositions(maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                                        break
                                    }
                                }
                            } else result = {caret: seekNext(maskPos)}
                        }
                    } else result = !1;
                    !1 !== result || !1 !== opts.keepStatic && !isComplete(getBuffer()) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && !0 === opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate(!0)) : result = alternate(maskPos, c, strict, fromIsValid, void 0, pos), !0 === result && (result = {pos: maskPos})
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !0 !== fromIsValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), void 0 !== pos.begin ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);
                    void 0 !== postResult && (result = !0 === postResult ? result : postResult)
                }
                result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet(!0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions(void 0, maskPos, !0);
                var endResult = processCommandObject(result);
                return endResult
            }

            function trackbackPositions(originalPos, newPos, fillOnly) {
                if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--) ;
                for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !isMask(ps, !0)) {
                    var vp = 0 == ps ? getTest(ps) : maskset.validPositions[ps - 1];
                    if (vp) {
                        var tests = getTests(ps).slice();
                        "" === tests[tests.length - 1].match.def && tests.pop();
                        var bestMatch = determineTestTemplate(ps, tests), np;
                        if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def}), bestMatch.generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly)) {
                            var cvpInput = maskset.validPositions[newPos].input;
                            return maskset.validPositions[newPos] = void 0, isValid(newPos, cvpInput, !0, !0)
                        }
                    }
                }
            }

            function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
                function IsEnclosedStatic(pos, valids, selection) {
                    var posMatch = valids[pos];
                    if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
                        nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch
                }

                var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos,
                    end = void 0 !== pos.end ? pos.end : pos;
                if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual && end < maskset.maskLength && (0 === begin && 0 === end || (begin += 1, end += 1)), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
                    var positionsClone = $.extend(!0, {}, maskset.validPositions),
                        lvp = void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual ? 1 < end ? end - 1 : end : getLastValidPosition(void 0, !0),
                        i;
                    for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
                    var valid = !0, j = validatedPos, posMatch = j, t;
                    if (i = j, validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++, begin < end && i++), validTest || opts.insertMode) for (; i <= lvp; i++) {
                        if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                            begin: begin,
                            end: end
                        }))) {
                            for (; "" !== getTest(posMatch).match.def;) {
                                if (positionCanMatchDefinition(posMatch, t, opts) || "+" === t.match.def) {
                                    "+" === t.match.def && getBuffer(!0);
                                    var result = isValid(posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                                    if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid) break
                                } else valid = !1;
                                if (valid) {
                                    void 0 === validTest && t.match.static && i === pos.begin && offset++;
                                    break
                                }
                                if (!valid && posMatch > maskset.maskLength) break;
                                posMatch++
                            }
                            "" == getTest(posMatch).match.def && (valid = !1), posMatch = j
                        }
                        if (!valid) break
                    }
                    if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1
                } else validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
                return resetMaskSet(!0), offset
            }

            function isMask(pos, strict, fuzzy) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), !0 !== test.static) return test.fn;
                if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
                if (!0 !== strict && -1 < pos) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)
                }
                return !1
            }

            function seekNext(pos, newBlock, fuzzy) {
                void 0 === fuzzy && (fuzzy = !0);
                for (var position = pos + 1; "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position, void 0, !0)) || !0 !== newBlock && !isMask(position, void 0, fuzzy));) position++;
                return position
            }

            function seekPrevious(pos, newBlock) {
                var position = pos, tests;
                if (position <= 0) return 0;
                for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position, void 0, !0) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def));) ;
                return position
            }

            function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0)
                        }
                        void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos)
                    }
                }
                if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), !0 === triggerEvents)) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
                        nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete")
                    }, 0)
                }
            }

            function getPlaceholder(pos, test, returnPL) {
                if (test = test || getTest(pos).match, void 0 !== test.placeholder || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
                if (-1 < pos && void 0 === maskset.validPositions[pos]) {
                    var tests = getTests(pos), staticAlternations = [], prevTest;
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length)
                }
                return test.def
            }

            function HandleNativePlaceholder(npt, value) {
                if (ie) {
                    if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                        var buffer = getBuffer().slice(), nptValue = npt.inputmask._valueGet();
                        if (nptValue !== value) {
                            var lvp = getLastValidPosition();
                            -1 === lvp && nptValue === getBufferTemplate().join("") ? buffer = [] : -1 !== lvp && clearOptionalTail(buffer), writeBuffer(npt, buffer)
                        }
                    }
                } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"))
            }

            function determineNewCaretPosition(selectedCaret, tabbed) {
                function doRadixFocus(clickPos) {
                    if ("" !== opts.radixPoint && 0 !== opts.digits) {
                        var vps = maskset.validPositions;
                        if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                            if (clickPos < seekNext(-1)) return !0;
                            var radixPos = $.inArray(opts.radixPoint, getBuffer());
                            if (-1 !== radixPos) {
                                for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                return !0
                            }
                        }
                    }
                    return !1
                }

                if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                    case"none":
                        break;
                    case"select":
                        return {begin: 0, end: getBuffer().length};
                    case"ignore":
                        return seekNext(getLastValidPosition());
                    case"radixFocus":
                        if (doRadixFocus(selectedCaret.begin)) {
                            var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                            return opts.numericInput ? seekNext(radixPos) : radixPos
                        }
                    default:
                        var clickPosition = selectedCaret.begin,
                            lvclickPosition = getLastValidPosition(clickPosition, !0),
                            lastPosition = seekNext(-1 !== lvclickPosition || isMask(0) ? lvclickPosition : 0);
                        if (clickPosition < lastPosition) return isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition);
                        var lvp = maskset.validPositions[lvclickPosition],
                            tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                            placeholder = getPlaceholder(lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                            var newPos = seekNext(lastPosition);
                            (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos)
                        }
                        return lastPosition
                }
            }

            var EventRuler = {
                on: function on(input, eventName, eventHandler) {
                    var ev = function ev(e) {
                        e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
                        var that = this, args;
                        if (void 0 === that.inputmask && "FORM" !== this.nodeName) {
                            var imOpts = $.data(that, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that)
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === keyCode.TAB))) {
                                switch (e.type) {
                                    case"input":
                                        if (!0 === skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return skipInputEvent = !1, e.preventDefault();
                                        if (mobile) return args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args), caret(that, that.inputmask.caretPos, void 0, !0)
                                        }, 0), !1;
                                        break;
                                    case"keydown":
                                        skipKeyPressEvent = !1, skipInputEvent = !1;
                                        break;
                                    case"keypress":
                                        if (!0 === skipKeyPressEvent) return e.preventDefault();
                                        skipKeyPressEvent = !0;
                                        break;
                                    case"click":
                                    case"focus":
                                        return validationEvent ? (validationEvent = !1, input.blur(), HandleNativePlaceholder(input, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")), setTimeout(function () {
                                            input.focus()
                                        }, 3e3)) : (args = arguments, setTimeout(function () {
                                            eventHandler.apply(that, args)
                                        }, 0)), !1
                                }
                                var returnVal = eventHandler.apply(that, arguments);
                                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal
                            }
                            e.preventDefault()
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev)
                }, off: function off(input, event) {
                    var events;
                    input.inputmask && input.inputmask.events && (event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
                        for (; 0 < evArr.length;) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev)
                        }
                        delete input.inputmask.events[eventName]
                    }))
                }
            }, EventHandlers = {
                keydownEvent: function keydownEvent(e) {
                    var input = this, $input = $(input), k = e.keyCode, pos = caret(input),
                        kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
                    if (void 0 !== kdResult) return kdResult;
                    if (k === keyCode.BACKSPACE || k === keyCode.DELETE || iphone && k === keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === keyCode.X && !("oncut" in input)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), maskset.p, e, input.inputmask._valueGet() !== getBuffer().join("")); else if (k === keyCode.END || k === keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0)
                    } else k === keyCode.HOME && !e.shiftKey || k === keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === keyCode.TAB ? (!0 === e.shiftKey ? (!0 === getTest(pos.begin).match.static && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < maskset.maskLength && pos.end--), pos.begin < maskset.maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === keyCode.RIGHT ? setTimeout(function () {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin)
                    }, 0) : k === keyCode.LEFT && setTimeout(function () {
                        var caretPos_begin = translatePosition(input.inputmask.caretPos.begin),
                            caretPos_end = translatePosition(input.inputmask.caretPos.end);
                        caret(input, isRTL ? caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1) : caretPos_begin - (0 === caretPos_begin ? 0 : 1))
                    }, 0));
                    ignorable = -1 !== $.inArray(k, opts.ignorables)
                }, keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
                    var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
                        $input.trigger("change")
                    }, 0)), skipInputEvent = !0, !0;
                    if (k) {
                        46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                        var pos = checkval ? {begin: ndx, end: ndx} : caret(input), forwardPosition,
                            c = String.fromCharCode(k);
                        maskset.writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
                            opts.onKeyValidation.call(input, k, valResult, opts)
                        }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval)
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult
                    }
                }, pasteEvent: function pasteEvent(e) {
                    var input = this, inputValue = this.inputmask._valueGet(!0), caretPos = caret(this), tempValue;
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
                        valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                        if (!e.clipboardData || !e.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
                        pasteValue = pasteValue || inputValue
                    }
                    return checkVal(this, !1, !1, pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), e.preventDefault()
                }, inputFallBackEvent: function inputFallBackEvent(e) {
                    function ieMobileHandler(input, inputValue, caretPos) {
                        if (iemobile) {
                            var inputChar = inputValue.replace(getBuffer().join(""), "");
                            if (1 === inputChar.length) {
                                var iv = inputValue.split("");
                                iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("")
                            }
                        }
                        return inputValue
                    }

                    function analyseChanges(inputValue, buffer, caretPos) {
                        for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl;) frontPart.push("~");
                        for (; frontBufferPart.length < fpl;) frontBufferPart.push("~");
                        for (; backPart.length < bpl;) backPart.unshift("~");
                        for (; backBufferPart.length < bpl;) backBufferPart.unshift("~");
                        var newBuffer = frontPart.concat(backPart), oldBuffer = frontBufferPart.concat(backBufferPart);
                        for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = getPlaceholder(translatePosition(i)), action) {
                            case"insertText":
                                i = bl;
                                break;
                            case"insertReplacementText":
                                "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                                break;
                            case"deleteContentBackward":
                                "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                                break;
                            default:
                                newBuffer[i] !== oldBuffer[i] && (oldBuffer[i] === placeholder && "~" === oldBuffer[i + 1] || "~" === oldBuffer[i] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", isMask(translatePosition(i), !0) && caretPos.end++) : i = bl);
                                break
                        }
                        return {action: action, data: data, caret: caretPos}
                    }

                    var input = this, inputValue = input.inputmask._valueGet(!0),
                        buffer = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""),
                        caretPos = caret(input, void 0, void 0, !0);
                    if (buffer !== inputValue) {
                        inputValue = ieMobileHandler(input, inputValue, caretPos);
                        var changes = analyseChanges(inputValue, buffer, caretPos);
                        switch (document.activeElement !== input && input.focus(), writeBuffer(input, getBuffer()), caret(input, caretPos.begin, caretPos.end, !0), changes.action) {
                            case"insertText":
                            case"insertReplacementText":
                                $.each(changes.data, function (ndx, entry) {
                                    var keypress = new $.Event("keypress");
                                    keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress)
                                }), setTimeout(function () {
                                    $el.trigger("keyup")
                                }, 0);
                                break;
                            case"deleteContentBackward":
                                var keydown = new $.Event("keydown");
                                keydown.keyCode = keyCode.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
                                break;
                            default:
                                applyInputValue(input, inputValue);
                                break
                        }
                        e.preventDefault()
                    }
                }, compositionendEvent: function compositionendEvent(e) {
                    $el.trigger("input")
                }, setValueEvent: function setValueEvent(e, argument_1, argument_2) {
                    var input = this, value = e && e.detail ? e.detail[0] : argument_1;
                    void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret(this, e.detail ? e.detail[1] : argument_2)
                }, focusEvent: function focusEvent(e) {
                    var input = this, nptValue = this.inputmask._valueGet();
                    opts.showMaskOnFocus && nptValue !== getBuffer().join("") && writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())), !0 !== opts.positionCaretOnTab || !1 !== mouseEnter || isComplete(getBuffer()) && -1 !== getLastValidPosition() || EventHandlers.clickEvent.apply(this, [e, !0]), undoValue = getBuffer().join("")
                }, invalidEvent: function invalidEvent(e) {
                    validationEvent = !0
                }, mouseleaveEvent: function mouseleaveEvent() {
                    var input = this;
                    mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this && HandleNativePlaceholder(this, originalPlaceholder)
                }, clickEvent: function clickEvent(e, tabbed) {
                    var input = this;
                    if (document.activeElement === this) {
                        var newCaretPosition = determineNewCaretPosition(caret(this), tabbed);
                        void 0 !== newCaretPosition && caret(this, newCaretPosition)
                    }
                }, cutEvent: function cutEvent(e) {
                    var input = this, pos = caret(this), clipboardData = window.clipboardData || e.clipboardData,
                        clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, keyCode.DELETE, pos), writeBuffer(this, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""))
                }, blurEvent: function blurEvent(e) {
                    var $input = $(this), input = this;
                    if (this.inputmask) {
                        HandleNativePlaceholder(this, originalPlaceholder);
                        var nptValue = this.inputmask._valueGet(), buffer = getBuffer().slice();
                        "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                            $input.trigger("incomplete")
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, void 0, e)), undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), $input.trigger("change"))
                    }
                }, mouseenterEvent: function mouseenterEvent() {
                    var input = this;
                    mouseEnter = !0, document.activeElement !== this && (null == originalPlaceholder && this.placeholder !== originalPlaceholder && (originalPlaceholder = this.placeholder), opts.showMaskOnHover && HandleNativePlaceholder(this, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")))
                }, submitEvent: function submitEvent() {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
                        writeBuffer(el, getBuffer())
                    }, 0))
                }, resetEvent: function resetEvent() {
                    el.inputmask.refreshValue = !0, setTimeout(function () {
                        applyInputValue(el, el.inputmask._valueGet(!0))
                    }, 0)
                }
            }, valueBuffer;

            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                var inputmask = this || input.inputmask, inputValue = nptvl.slice(), charCodes = "", initialNdx = -1,
                    result = void 0;

                function isTemplateMatch(ndx, charCodes) {
                    for (var targetTemplate = getMaskTemplate(!0, 0).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) charCodeNdx--;
                    var match = 0 === charCodeNdx && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx).match.static && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx + 1).match.static && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                    return !match && 0 < charCodeNdx && (inputmask.caretPos = {begin: seekNext(charCodeNdx)}), match
                }

                resetMaskSet(), maskset.tests = {}, initialNdx = opts.radixPoint ? determineNewCaretPosition(0) : 0, maskset.p = initialNdx, inputmask.caretPos = {begin: initialNdx};
                var staticMatches = [], prevCaretPos = inputmask.caretPos;
                if ($.each(inputValue, function (ndx, charCode) {
                    if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++; else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(void 0, !0);
                        isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer(void 0, getBuffer(), result.forwardPosition, keypress, !1), inputmask.caretPos = {
                            begin: result.forwardPosition,
                            end: result.forwardPosition
                        }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos
                    }
                }), 0 < staticMatches.length) {
                    var sndx, validPos, nextValid = seekNext(-1, void 0, !1);
                    if (!isComplete(getBuffer()) && staticMatches.length <= nextValid || isComplete(getBuffer()) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift());) {
                        var keypress = new $.Event("_checkval");
                        if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos); else if (!result) break;
                        nextSndx++
                    } else for (; sndx = staticMatches.pop();) validPos = maskset.validPositions[sndx], validPos && (validPos.generatedInput = !0)
                }
                writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : void 0, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type)
            }

            function unmaskedvalue(input) {
                if (input) {
                    if (void 0 === input.inputmask) return input.value;
                    input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0))
                }
                var umValue = [], vps = maskset.validPositions;
                for (var pndx in vps) vps[pndx] && vps[pndx].match && 1 != vps[pndx].match.static && umValue.push(vps[pndx].input);
                var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts)
                }
                return unmaskedValue
            }

            function translatePosition(pos) {
                return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = el.inputmask._valueGet().length - pos), pos
            }

            function caret(input, begin, end, notranslate) {
                var range;
                if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), opts.insertModeVisual && !1 === opts.insertMode && begin === end - 1 && end--, {
                    begin: notranslate ? begin : translatePosition(begin),
                    end: notranslate ? end : translatePosition(end)
                };
                if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), "number" == typeof begin) {
                    begin = notranslate ? begin : translatePosition(begin), end = notranslate ? end : translatePosition(end), end = "number" == typeof end ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
                        begin: begin,
                        end: end
                    }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && end++, input === document.activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                        if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode)
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range)
                    } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select())
                }
            }

            function determineLastRequiredPosition(returnDefinition) {
                var buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0), bl = buffer.length, pos,
                    lvp = getLastValidPosition(), positions = {}, lvTest = maskset.validPositions[lvp],
                    ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0, testPos;
                for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
                var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
                for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                return returnDefinition ? {l: bl, def: positions[bl] ? positions[bl].match : void 0} : bl
            }

            function clearOptionalTail(buffer) {
                buffer.length = 0;
                for (var template = getMaskTemplate(!0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) buffer.push(lmnt);
                return buffer
            }

            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" !== opts.repeat) {
                    var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                    if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                        complete = !0;
                        for (var i = 0; i <= aml; i++) {
                            var test = getTestTemplate(i).match;
                            if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder(i, test)) {
                                complete = !1;
                                break
                            }
                        }
                    }
                    return complete
                }
            }

            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === keyCode.BACKSPACE ? k = keyCode.DELETE : k === keyCode.DELETE && (k = keyCode.BACKSPACE), isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend
                }
                var offset;
                if (k === keyCode.BACKSPACE || k === keyCode.DELETE && !1 === opts.insertMode && opts.insertModeVisual ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious(pos.begin), void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0, !0) ? pos.end + 1 : seekNext(pos.end) + 1, void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.end++), !1 !== (offset = revalidateMask(pos))) {
                    if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest(pos.begin).match.def.indexOf("|")) {
                        var result = alternate(!0);
                        if (result) {
                            var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
                            (k !== keyCode.DELETE || pos.begin > newPos) && pos.begin
                        }
                    }
                    var lvp = getLastValidPosition(pos.end, !0);
                    lvp < pos.begin ? maskset.p = !1 === opts.insertMode && opts.insertModeVisual ? seekPrevious(lvp + 1) : seekNext(lvp) : !0 !== strict && (maskset.p = k === keyCode.DELETE ? pos.begin + offset : pos.begin, !1 === opts.insertMode && opts.insertModeVisual && k === keyCode.DELETE && (maskset.p = pos.end + 1, void 0 === maskset.validPositions[maskset.p] && getLastValidPosition(maskset.maskLength, !0) < maskset.p && (maskset.p = seekPrevious(lvp + 1))))
                }
            }

            function applyInputValue(input, value) {
                input.inputmask.refreshValue = !1, $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && -1 === getLastValidPosition() && input.inputmask._valueSet("")
            }

            function mask(elem) {
                function isElementTypeSupported(input, opts) {
                    function patchValueProperty(npt) {
                        var valueGet, valueSet;

                        function patchValhook(type) {
                            if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                                        return elem.value
                                    },
                                    valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                                        return elem.value = value, elem
                                    };
                                $.valHooks[type] = {
                                    get: function get(elem) {
                                        if (elem.inputmask) {
                                            if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                            var result = valhookGet(elem);
                                            return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : ""
                                        }
                                        return valhookGet(elem)
                                    }, set: function set(elem, value) {
                                        var result = valhookSet(elem, value);
                                        return elem.inputmask && applyInputValue(elem, value), result
                                    }, inputmaskpatch: !0
                                }
                            }
                        }

                        function getter() {
                            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this)
                        }

                        function setter(value) {
                            valueSet.call(this, value), this.inputmask && applyInputValue(this, value)
                        }

                        function installNativeValueSetFallback(npt) {
                            EventRuler.on(npt, "mouseenter", function () {
                                var input = this, value = this.inputmask._valueGet(!0);
                                value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("") && applyInputValue(this, value)
                            })
                        }

                        if (!npt.inputmask.__valueGet) {
                            if (!0 !== opts.noValuePatching) {
                                if (Object.getOwnPropertyDescriptor) {
                                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
                                        return object.__proto__
                                    } : function (object) {
                                        return object.constructor.prototype
                                    });
                                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                                        return this.textContent
                                    }, valueSet = function valueSet(value) {
                                        this.textContent = value
                                    }, Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: !0
                                    }))
                                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet
                            }
                            npt.inputmask._valueGet = function (overruleRTL) {
                                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el)
                            }, npt.inputmask._valueSet = function (value, overruleRTL) {
                                valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value)
                            }, void 0 === valueGet && (valueGet = function valueGet() {
                                return this.value
                            }, valueSet = function valueSet(value) {
                                this.value = value
                            }, patchValhook(npt.type), installNativeValueSetFallback(npt))
                        }
                    }

                    "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(keyCode.ENTER);
                    var elementType = input.getAttribute("type"),
                        isSupported = "input" === input.tagName.toLowerCase() && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                    if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                        var el = document.createElement("input");
                        el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null
                    } else isSupported = "partial";
                    return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported
                }

                EventRuler.off(elem);
                var isSupported = isElementTypeSupported(elem, opts);
                if (!1 !== isSupported && (el = elem, $el = $(el), originalPlaceholder = el.placeholder, maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "invalid", EventHandlers.invalidEvent), EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                    applyInputValue(el, el.inputmask._valueGet(!0), opts);
                    var buffer = getBuffer().slice();
                    !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()))
                }
            }

            if (void 0 !== actionObj) switch (actionObj.action) {
                case"isComplete":
                    return el = actionObj.el, isComplete(getBuffer());
                case"unmaskedvalue":
                    return void 0 !== el && void 0 === actionObj.value || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal.call(this, void 0, !1, !1, valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, void 0, getBuffer(), 0, opts)), unmaskedvalue(el);
                case"mask":
                    mask(el);
                    break;
                case"format":
                    return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer), actionObj.metadata ? {
                        value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                        metadata: maskScope.call(this, {action: "getmetadata"}, maskset, opts)
                    } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                case"isValid":
                    actionObj.value ? (valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer)) : actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
                    for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--) ;
                    return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));
                case"getemptymask":
                    return getBufferTemplate().join("");
                case"remove":
                    if (el && el.inputmask) {
                        $.data(el, "_inputmask_opts", null), $el = $(el);
                        var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask),
                            valueProperty;
                        cv !== getBufferTemplate().join("") ? el.inputmask._valueSet(cv, opts.autoUnmask) : el.inputmask._valueSet(""), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                            get: el.inputmask.__valueGet,
                            set: el.inputmask.__valueSet,
                            configurable: !0
                        })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0
                    }
                    return el;
                case"getmetadata":
                    if ($.isArray(maskset.metadata)) {
                        var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                        return $.each(maskset.metadata, function (ndx, mtdt) {
                            if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1
                        }), maskTarget
                    }
                    return maskset.metadata
            }
        }
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var Inputmask = __webpack_require__(1), $ = Inputmask.dependencyLib, keyCode = __webpack_require__(0),
            formatCode = {
                d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
                dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
                    return pad(Date.prototype.getDate.call(this), 2)
                }],
                ddd: [""],
                dddd: [""],
                m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                    return Date.prototype.getMonth.call(this) + 1
                }],
                mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
                    return pad(Date.prototype.getMonth.call(this) + 1, 2)
                }],
                mmm: [""],
                mmmm: [""],
                yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
                    return pad(Date.prototype.getFullYear.call(this), 2)
                }],
                yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
                    return pad(Date.prototype.getFullYear.call(this), 4)
                }],
                h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
                    return pad(Date.prototype.getHours.call(this), 2)
                }],
                hx: [function (x) {
                    return "[0-9]{".concat(x, "}")
                }, Date.prototype.setHours, "hours", function (x) {
                    return Date.prototype.getHours
                }],
                H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
                    return pad(Date.prototype.getHours.call(this), 2)
                }],
                Hx: [function (x) {
                    return "[0-9]{".concat(x, "}")
                }, Date.prototype.setHours, "hours", function (x) {
                    return function () {
                        return pad(Date.prototype.getHours.call(this), x)
                    }
                }],
                M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
                MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
                    return pad(Date.prototype.getMinutes.call(this), 2)
                }],
                s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
                ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
                    return pad(Date.prototype.getSeconds.call(this), 2)
                }],
                l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
                    return pad(Date.prototype.getMilliseconds.call(this), 3)
                }],
                L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
                    return pad(Date.prototype.getMilliseconds.call(this), 2)
                }],
                t: ["[ap]"],
                tt: ["[ap]m"],
                T: ["[AP]"],
                TT: ["[AP]M"],
                Z: [""],
                o: [""],
                S: [""]
            }, formatAlias = {
                isoDate: "yyyy-mm-dd",
                isoTime: "HH:MM:ss",
                isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
            };

        function formatcode(match) {
            var dynMatches = new RegExp("\\d+$").exec(match[0]);
            if (dynMatches && void 0 !== dynMatches[0]) {
                var fcode = formatCode[match[0][0] + "x"].slice("");
                return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode
            }
            if (formatCode[match[0]]) return formatCode[match[0]]
        }

        function getTokenizer(opts) {
            if (!opts.tokenizer) {
                var tokens = [], dyntokens = [];
                for (var ndx in formatCode) if (ndx.endsWith("x")) {
                    var dynToken = ndx[0] + "\\d+";
                    -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken)
                } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
                opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g")
            }
            return opts.tokenizer
        }

        function isValidDate(dateParts, currentResult) {
            return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult
        }

        function isDateInRange(dateParts, opts) {
            var result = !0;
            if (opts.min) {
                if (dateParts.rawyear) {
                    var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
                        minYear = opts.min.year.substr(0, rawYear.length);
                    result = minYear <= rawYear
                }
                dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime())
            }
            return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result
        }

        function parse(format, dateObjValue, opts, raw) {
            var mask = "", match, fcode;
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) if (void 0 === dateObjValue) if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")"; else switch (match[0]) {
                case"[":
                    mask += "(";
                    break;
                case"]":
                    mask += ")?";
                    break;
                default:
                    mask += Inputmask.escapeRegex(match[0])
            } else if (fcode = formatcode(match)) if (!0 !== raw && fcode[3]) {
                var getFn = fcode[3];
                mask += getFn.call(dateObjValue.date)
            } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0]; else mask += match[0];
            return mask
        }

        function pad(val, len) {
            for (val = String(val), len = len || 2; val.length < len;) val = "0" + val;
            return val
        }

        function analyseMask(maskString, format, opts) {
            var dateObj = {date: new Date(1, 0, 1)}, targetProp, mask = maskString, match, dateOperation;

            function extendProperty(value) {
                var correctedValue = value.replace(/[^0-9]/g, "0");
                return correctedValue
            }

            function setValue(dateObj, value, opts) {
                dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp])
            }

            if ("string" == typeof mask) {
                for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
                    var value = mask.slice(0, match[0].length);
                    formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length)
                }
                return dateObj
            }
            if (mask && "object" === _typeof(mask) && mask.hasOwnProperty("date")) return mask
        }

        Inputmask.extendAliases({
            datetime: {
                mask: function mask(opts) {
                    return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), null
                },
                placeholder: "",
                inputFormat: "isoDateTime",
                displayFormat: void 0,
                outputFormat: void 0,
                min: null,
                max: null,
                skipOptionalPartCharacter: "",
                i18n: {
                    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    ordinalSuffix: ["st", "nd", "rd", "th"]
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (strict) return !0;
                    var calcPos = 0, targetMatch, match;
                    if (isNaN(c) && buffer[pos] !== c) {
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) if (calcPos += match[0].length, pos <= calcPos) {
                            targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                            break
                        }
                        if (match && match[0] === c && 1 < targetMatch[0].length) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
                            fuzzy: !0,
                            buffer: buffer,
                            refreshFromBuffer: {start: pos - 1, end: pos + 1},
                            pos: pos + 1
                        }
                    }
                    return !0
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos);
                    var calcPos = 0, match;
                    for (getTokenizer(opts).lastIndex = 0; (match = getTokenizer(opts).exec(opts.inputFormat)) && (calcPos += match[0].length, !(pos < calcPos));) ;
                    if (match && match[0] && void 0 !== formatCode[match[0]]) {
                        var validator = formatCode[match[0]][0],
                            part = buffer.slice(match.index, match.index + match[0].length);
                        !1 === new RegExp(validator).test(part.join("")) && 2 === match[0].length && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1] && (maskset.validPositions[match.index + 1].input = "0")
                    }
                    var result = currentResult, dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
                    return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = isValidDate(dateParts, result), result = result && isDateInRange(dateParts, opts)), pos && result && currentResult.pos !== pos ? {
                        buffer: parse(opts.inputFormat, dateParts, opts).split(""),
                        refreshFromBuffer: {start: pos, end: currentResult.pos}
                    } : result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var input = this;
                    if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
                        var today = new Date, match, date = "";
                        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
                        this.inputmask._valueSet(date), $(this).trigger("setvalue")
                    }
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue
                },
                casing: function casing(elem, test, pos, validPositions) {
                    return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem
                },
                insertMode: !1,
                shiftPositions: !1,
                keepStatic: !1
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var Inputmask = __webpack_require__(1), $ = Inputmask.dependencyLib, keyCode = __webpack_require__(0);

        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt
        }

        function alignDigits(buffer, digits, opts, force) {
            if (0 < digits && (!opts.digitsOptional || force)) {
                var radixPosition = $.inArray(opts.radixPoint, buffer);
                -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
                for (var i = 1; i <= digits; i++) buffer[radixPosition + i] = buffer[radixPosition + i] || "0"
            }
            return buffer
        }

        function findValidator(symbol, maskset) {
            var posNdx = 0;
            if ("+" === symbol) {
                for (posNdx in maskset.validPositions) ;
                posNdx = parseInt(posNdx)
            }
            for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
            return posNdx
        }

        function findValid(symbol, maskset) {
            var ret = -1;
            return $.each(maskset.validPositions, function (ndx, tst) {
                if (tst && tst.match.def === symbol) return ret = parseInt(ndx), !1
            }), ret
        }

        function parseMinMaxOptions(opts) {
            void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done")
        }

        function genMask(opts) {
            opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
            var decimalDef = "0";
            !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1) : (opts.__financeInput = !1, opts.numericInput = !0);
            var mask = "[+]", altMask;
            if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? mask += opts._mask(opts) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
                var dq = opts.digits.toString().split(",");
                isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}")
            }
            return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask
        }

        function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
            return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), pos
        }

        function decimalValidator(chrs, maskset, pos, strict, opts) {
            var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
                result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
            return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
                insert: {
                    pos: radixPos === pos ? radixPos + 1 : radixPos,
                    c: opts.radixPoint
                }, pos: pos
            } : result
        }

        function checkForLeadingZeroes(buffer, opts) {
            try {
                var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
                    number = numberMatches ? numberMatches[2] : "", leadingzeroes = !1;
                return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes
            } catch (e) {
                console.log(buffer.slice().reverse().join(""))
            }
        }

        Inputmask.extendAliases({
            numeric: {
                mask: genMask,
                _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "999){+|1}"
                },
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                _radixDance: !0,
                groupSeparator: "",
                allowMinus: !0,
                negationSymbol: {front: "-", back: ""},
                prefix: "",
                suffix: "",
                min: null,
                max: null,
                step: 1,
                unmaskAsNumber: !1,
                roundingFN: Math.round,
                inputmode: "numeric",
                shortcuts: {k: "000", m: "000000"},
                placeholder: "0",
                greedy: !1,
                rightAlign: !0,
                insertMode: !0,
                autoUnmask: !1,
                skipOptionalPartCharacter: "",
                definitions: {
                    0: {validator: decimalValidator},
                    1: {validator: decimalValidator, definitionSymbol: "*"},
                    "+": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front)
                        }
                    },
                    "-": {
                        validator: function validator(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back
                        }
                    }
                },
                preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
                    if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
                    var pattern;
                    if (pattern = opts.shortcuts && opts.shortcuts[c]) {
                        if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
                            pos: pos + i,
                            c: pattern[i],
                            strict: !1
                        });
                        return {insert: inserts}
                    }
                    var radixPos = $.inArray(opts.radixPoint, buffer), initPos = pos;
                    if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" !== c && c !== opts.negationSymbol.front) return !!strict || (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos ? {caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos} : isSelection && opts.digitsOptional ? {rewritePosition: caretPos.end} : isSelection && !opts.digitsOptional && caretPos.begin > radixPos && caretPos.end <= radixPos ? c === opts.radixPoint ? {
                        insert: {
                            pos: radixPos + 1,
                            c: "0",
                            fromIsValid: !0
                        }, rewritePosition: radixPos
                    } : {rewritePosition: radixPos + 1} : isSelection && !opts.digitsOptional && caretPos.begin < radixPos ? {rewritePosition: caretPos.begin - 1} : {rewritePosition: pos});
                    if (!0 !== opts.allowMinus) return !1;
                    var isNegative = !1, front = findValid("+", maskset), back = findValid("-", maskset);
                    return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
                        remove: isNegative,
                        caret: initPos
                    } : {
                        insert: [{
                            pos: findValidator("+", maskset),
                            c: opts.negationSymbol.front,
                            fromIsValid: !0
                        }, {pos: findValidator("-", maskset), c: opts.negationSymbol.back, fromIsValid: void 0}],
                        caret: initPos + opts.negationSymbol.back.length
                    }
                },
                postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
                    if (strict) return !0;
                    if (null !== opts.min || null !== opts.max) {
                        var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                        if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        };
                        if (null !== opts.max && unmasked > opts.max) return {
                            refreshFromBuffer: !0,
                            buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                        }
                    }
                    return currentResult
                },
                onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue
                },
                isComplete: function isComplete(buffer, opts) {
                    var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
                    return maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), isFinite(maskedValue)
                },
                onBeforeMask: function onBeforeMask(initialValue, opts) {
                    var radixPoint = opts.radixPoint || ",";
                    "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
                    var valueParts = initialValue.split(radixPoint),
                        integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
                        decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
                        forceDigits = 1 < valueParts.length;
                    initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
                    var digits = 0;
                    if ("" !== radixPoint && (digits = decimalPart.length, "" !== decimalPart)) {
                        var digitsFactor = Math.pow(10, digits || 1);
                        isFinite(opts.digits) && (digits = parseInt(opts.digits), digitsFactor = Math.pow(10, digits)), initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), "."), isFinite(initialValue) && (initialValue = opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor), initialValue = initialValue.toString().replace(".", radixPoint)
                    }
                    if (0 === opts.digits && -1 !== initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) && (initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)))), null !== opts.min || null !== opts.max) {
                        var numberValue = initialValue.toString().replace(radixPoint, ".");
                        null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint))
                    }
                    return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("")
                },
                onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
                    function stripBuffer(buffer, stripRadix) {
                        if (!1 !== opts.__financeInput || stripRadix) {
                            var position = $.inArray(opts.radixPoint, buffer);
                            -1 !== position && buffer.splice(position, 1)
                        }
                        if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) buffer.splice(position, 1);
                        return buffer
                    }

                    var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
                    if (leadingzeroes) {
                        var buf = buffer.slice().reverse(), caretNdx = buf.join("").indexOf(leadingzeroes[0]);
                        buf.splice(caretNdx, leadingzeroes[0].length);
                        var newCaretPos = buf.length - caretNdx;
                        stripBuffer(buf), result = {
                            refreshFromBuffer: !0,
                            buffer: buf.reverse(),
                            caret: caretPos < newCaretPos ? caretPos : newCaretPos
                        }
                    }
                    if (e) switch (e.type) {
                        case"blur":
                        case"checkval":
                            if (null !== opts.min) {
                                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {unmaskAsNumber: !0}));
                                if (null !== opts.min && unmasked < opts.min) return {
                                    refreshFromBuffer: !0,
                                    buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                                }
                            }
                            if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                                    number = nmbrMtchs ? nmbrMtchs[2] : "";
                                0 == number && (result = {refreshFromBuffer: !0, buffer: [0]})
                            } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                                refreshFromBuffer: !0,
                                buffer: stripBuffer(buffer)
                            }));
                            if (opts.enforceDigitsOnBlur) {
                                result = result || {};
                                var bffr = result && result.buffer || buffer.slice().reverse();
                                result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse()
                            }
                    }
                    return result
                },
                onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
                    var $input = $(this), bffr;
                    if (e.ctrlKey) switch (e.keyCode) {
                        case keyCode.UP:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;
                        case keyCode.DOWN:
                            return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1
                    }
                    if (!e.shiftKey && (e.keyCode === keyCode.DELETE || e.keyCode === keyCode.BACKSPACE || e.keyCode === keyCode.BACKSPACE_SAFARI)) {
                        if (buffer[e.keyCode === keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
                        if (!0 === opts._radixDance) {
                            var radixPos = $.inArray(opts.radixPoint, buffer);
                            if (opts.digitsOptional) {
                                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]), !1
                            } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === keyCode.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== keyCode.BACKSPACE && e.keyCode !== keyCode.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]), !1
                        }
                    }
                }
            },
            currency: {prefix: "", groupSeparator: ",", alias: "numeric", digits: 2, digitsOptional: !1},
            decimal: {alias: "numeric"},
            integer: {alias: "numeric", digits: 0},
            percentage: {alias: "numeric", min: 0, max: 100, suffix: " %", digits: 0, allowMinus: !1},
            indianns: {
                alias: "numeric", _mask: function _mask(opts) {
                    return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}"
                }, groupSeparator: ",", radixPoint: ".", placeholder: "0", digits: 2, digitsOptional: !1
            }
        }), module.exports = Inputmask
    }, function (module, exports, __webpack_require__) {
        "use strict";

        function _typeof(obj) {
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
                return typeof obj
            } : function _typeof(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
            }, _typeof(obj)
        }

        var $ = __webpack_require__(3), Inputmask = __webpack_require__(1);
        void 0 === $.fn.inputmask && ($.fn.inputmask = function (fn, options) {
            var nptmask, input = this[0];
            if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
                case"unmaskedvalue":
                    return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
                case"remove":
                    return this.each(function () {
                        this.inputmask && this.inputmask.remove()
                    });
                case"getemptymask":
                    return input && input.inputmask ? input.inputmask.getemptymask() : "";
                case"hasMaskedValue":
                    return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();
                case"isComplete":
                    return !input || !input.inputmask || input.inputmask.isComplete();
                case"getmetadata":
                    return input && input.inputmask ? input.inputmask.getmetadata() : void 0;
                case"setvalue":
                    Inputmask.setValue(input, options);
                    break;
                case"option":
                    if ("string" != typeof options) return this.each(function () {
                        if (void 0 !== this.inputmask) return this.inputmask.option(options)
                    });
                    if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                    break;
                default:
                    return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                        nptmask.mask(this)
                    })
            } else {
                if (Array.isArray(fn)) return options.alias = fn, nptmask = new Inputmask(options), this.each(function () {
                    nptmask.mask(this)
                });
                if ("object" == _typeof(fn)) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function () {
                    if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                    nptmask.mask(this)
                }) : this.each(function () {
                    nptmask.mask(this)
                });
                if (void 0 === fn) return this.each(function () {
                    nptmask = new Inputmask(options), nptmask.mask(this)
                })
            }
        })
    }, function (module, exports, __webpack_require__) {
        "use strict";
        var im = __webpack_require__(6), jQuery = __webpack_require__(3);
        im.dependencyLib === jQuery && __webpack_require__(11), module.exports = im
    }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {enumerable: !0, get: getter})
    }, __webpack_require__.r = function (exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(exports, "__esModule", {value: !0})
    }, __webpack_require__.t = function (value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key]
        }.bind(null, key));
        return ns
    }, __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module.default
        } : function getModuleExports() {
            return module
        };
        return __webpack_require__.d(getter, "a", getter), getter
    }, __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 12);

    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {i: moduleId, l: !1, exports: {}};
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
    }

    var modules, installedModules
});

$(function () {
    var goda = '<option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option>';
    var goroda = '<option value="Абаза" selected>Абаза</option><option value="Абакан">Абакан</option><option value="Абдулино">Абдулино</option><option value="Абинск">Абинск</option><option value="Агидель">Агидель</option><option value="Агрыз">Агрыз</option><option value="Адыгейск">Адыгейск</option><option value="Азнакаево">Азнакаево</option><option value="Азов">Азов</option><option value="Ак-Довурак">Ак-Довурак</option><option value="Аксай">Аксай</option><option value="Алагир">Алагир</option><option value="Алапаевск">Алапаевск</option><option value="Алатырь">Алатырь</option><option value="Алдан">Алдан</option><option value="Алейск">Алейск</option><option value="Александров">Александров</option><option value="Александровск">Александровск</option><option value="Александровск-Сахалинский">Александровск-Сахалинский</option><option value="Алексеевка">Алексеевка</option><option value="Алексин">Алексин</option><option value="Алзамай">Алзамай</option><option value="Алупка">Алупка</option><option value="Алушта">Алушта</option><option value="Альметьевск">Альметьевск</option><option value="Амурск">Амурск</option><option value="Анадырь">Анадырь</option><option value="Анапа">Анапа</option><option value="Ангарск">Ангарск</option><option value="Андреаполь">Андреаполь</option><option value="Анжеро-Судженск">Анжеро-Судженск</option><option value="Анива">Анива</option><option value="Апатиты">Апатиты</option><option value="Апрелевка">Апрелевка</option><option value="Апшеронск">Апшеронск</option><option value="Арамиль">Арамиль</option><option value="Аргун">Аргун</option><option value="Ардатов">Ардатов</option><option value="Ардон">Ардон</option><option value="Арзамас">Арзамас</option><option value="Аркадак">Аркадак</option><option value="Армавир">Армавир</option><option value="Армянск">Армянск</option><option value="Арсеньев">Арсеньев</option><option value="Арск">Арск</option><option value="Артём">Артём</option><option value="Артёмовск">Артёмовск</option><option value="Артёмовский">Артёмовский</option><option value="Архангельск">Архангельск</option><option value="Асбест">Асбест</option><option value="Асино">Асино</option><option value="Астрахань">Астрахань</option><option value="Аткарск">Аткарск</option><option value="Ахтубинск">Ахтубинск</option><option value="Ачинск">Ачинск</option><option value="Аша">Аша</option><option value="Бабаево">Бабаево</option><option value="Бабушкин">Бабушкин</option><option value="Бавлы">Бавлы</option><option value="Багратионовск">Багратионовск</option><option value="Байкальск">Байкальск</option><option value="Баймак">Баймак</option><option value="Бакал">Бакал</option><option value="Баксан">Баксан</option><option value="Балабаново">Балабаново</option><option value="Балаково">Балаково</option><option value="Балахна">Балахна</option><option value="Балашиха">Балашиха</option><option value="Балашов">Балашов</option><option value="Балей">Балей</option><option value="Балтийск">Балтийск</option><option value="Барабинск">Барабинск</option><option value="Барнаул">Барнаул</option><option value="Барыш">Барыш</option><option value="Батайск">Батайск</option><option value="Бахчисарай">Бахчисарай</option><option value="Бежецк">Бежецк</option><option value="Белая Калитва">Белая Калитва</option><option value="Белая Холуница">Белая Холуница</option><option value="Белгород">Белгород</option><option value="Белебей">Белебей</option><option value="Белёв">Белёв</option><option value="Белинский">Белинский</option><option value="Белово">Белово</option><option value="Белогорск">Белогорск</option><option value="Белозерск">Белозерск</option><option value="Белокуриха">Белокуриха</option><option value="Беломорск">Беломорск</option><option value="Белоозёрский">Белоозёрский</option><option value="Белорецк">Белорецк</option><option value="Белореченск">Белореченск</option><option value="Белоусово">Белоусово</option><option value="Белоярский">Белоярский</option><option value="Белый">Белый</option><option value="Бердск">Бердск</option><option value="Березники">Березники</option><option value="Берёзовский">Берёзовский</option><option value="Беслан">Беслан</option><option value="Бийск">Бийск</option><option value="Бикин">Бикин</option><option value="Билибино">Билибино</option><option value="Биробиджан">Биробиджан</option><option value="Бирск">Бирск</option><option value="Бирюсинск">Бирюсинск</option><option value="Бирюч">Бирюч</option><option value="Благовещенск">Благовещенск</option><option value="Благодарный">Благодарный</option><option value="Бобров">Бобров</option><option value="Богданович">Богданович</option><option value="Богородицк">Богородицк</option><option value="Богородск">Богородск</option><option value="Боготол">Боготол</option><option value="Богучар">Богучар</option><option value="Бодайбо">Бодайбо</option><option value="Бокситогорск">Бокситогорск</option><option value="Болгар">Болгар</option><option value="Бологое">Бологое</option><option value="Болотное">Болотное</option><option value="Болохово">Болохово</option><option value="Болхов">Болхов</option><option value="Большой Камень">Большой Камень</option><option value="Бор">Бор</option><option value="Борзя">Борзя</option><option value="Борисоглебск">Борисоглебск</option><option value="Боровичи">Боровичи</option><option value="Боровск">Боровск</option><option value="Бородино">Бородино</option><option value="Братск">Братск</option><option value="Бронницы">Бронницы</option><option value="Брянск">Брянск</option><option value="Бугульма">Бугульма</option><option value="Бугуруслан">Бугуруслан</option><option value="Будённовск">Будённовск</option><option value="Бузулук">Бузулук</option><option value="Буинск">Буинск</option><option value="Буй">Буй</option><option value="Буйнакск">Буйнакск</option><option value="Бутурлиновка">Бутурлиновка</option><option value="Валдай">Валдай</option><option value="Валуйки">Валуйки</option><option value="Велиж">Велиж</option><option value="Великие Луки">Великие Луки</option><option value="Великий Новгород">Великий Новгород</option><option value="Великий Устюг">Великий Устюг</option><option value="Вельск">Вельск</option><option value="Венёв">Венёв</option><option value="Верещагино">Верещагино</option><option value="Верея">Верея</option><option value="Верхнеуральск">Верхнеуральск</option><option value="Верхний Тагил">Верхний Тагил</option><option value="Верхний Уфалей">Верхний Уфалей</option><option value="Верхняя Пышма">Верхняя Пышма</option><option value="Верхняя Салда">Верхняя Салда</option><option value="Верхняя Тура">Верхняя Тура</option><option value="Верхотурье">Верхотурье</option><option value="Верхоянск">Верхоянск</option><option value="Весьегонск">Весьегонск</option><option value="Ветлуга">Ветлуга</option><option value="Видное">Видное</option><option value="Вилюйск">Вилюйск</option><option value="Вилючинск">Вилючинск</option><option value="Вихоревка">Вихоревка</option><option value="Вичуга">Вичуга</option><option value="Владивосток">Владивосток</option><option value="Владикавказ">Владикавказ</option><option value="Владимир">Владимир</option><option value="Волгоград">Волгоград</option><option value="Волгодонск">Волгодонск</option><option value="Волгореченск">Волгореченск</option><option value="Волжск">Волжск</option><option value="Волжский">Волжский</option><option value="Вологда">Вологда</option><option value="Володарск">Володарск</option><option value="Волоколамск">Волоколамск</option><option value="Волосово">Волосово</option><option value="Волхов">Волхов</option><option value="Волчанск">Волчанск</option><option value="Вольск">Вольск</option><option value="Воркута">Воркута</option><option value="Воронеж">Воронеж</option><option value="Ворсма">Ворсма</option><option value="Воскресенск">Воскресенск</option><option value="Воткинск">Воткинск</option><option value="Всеволожск">Всеволожск</option><option value="Вуктыл">Вуктыл</option><option value="Выборг">Выборг</option><option value="Выкса">Выкса</option><option value="Высоковск">Высоковск</option><option value="Высоцк">Высоцк</option><option value="Вытегра">Вытегра</option><option value="Вышний Волочёк">Вышний Волочёк</option><option value="Вяземский">Вяземский</option><option value="Вязники">Вязники</option><option value="Вязьма">Вязьма</option><option value="Вятские Поляны">Вятские Поляны</option><option value="Гаврилов Посад">Гаврилов Посад</option><option value="Гаврилов-Ям">Гаврилов-Ям</option><option value="Гагарин">Гагарин</option><option value="Гаджиево">Гаджиево</option><option value="Гай">Гай</option><option value="Галич">Галич</option><option value="Гатчина">Гатчина</option><option value="Гвардейск">Гвардейск</option><option value="Гдов">Гдов</option><option value="Геленджик">Геленджик</option><option value="Георгиевск">Георгиевск</option><option value="Глазов">Глазов</option><option value="Голицыно">Голицыно</option><option value="Горбатов">Горбатов</option><option value="Горно-Алтайск">Горно-Алтайск</option><option value="Горнозаводск">Горнозаводск</option><option value="Горняк">Горняк</option><option value="Городец">Городец</option><option value="Городище">Городище</option><option value="Городовиковск">Городовиковск</option><option value="Гороховец">Гороховец</option><option value="Горячий Ключ">Горячий Ключ</option><option value="Грайворон">Грайворон</option><option value="Гремячинск">Гремячинск</option><option value="Грозный">Грозный</option><option value="Грязи">Грязи</option><option value="Грязовец">Грязовец</option><option value="Губаха">Губаха</option><option value="Губкин">Губкин</option><option value="Губкинский">Губкинский</option><option value="Гудермес">Гудермес</option><option value="Гуково">Гуково</option><option value="Гулькевичи">Гулькевичи</option><option value="Гурьевск">Гурьевск</option><option value="Гусев">Гусев</option><option value="Гусиноозёрск">Гусиноозёрск</option><option value="Гусь-Хрустальный">Гусь-Хрустальный</option><option value="Давлеканово">Давлеканово</option><option value="Дагестанские Огни">Дагестанские Огни</option><option value="Далматово">Далматово</option><option value="Дальнегорск">Дальнегорск</option><option value="Дальнереченск">Дальнереченск</option><option value="Данилов">Данилов</option><option value="Данков">Данков</option><option value="Дегтярск">Дегтярск</option><option value="Дедовск">Дедовск</option><option value="Демидов">Демидов</option><option value="Дербент">Дербент</option><option value="Десногорск">Десногорск</option><option value="Джанкой">Джанкой</option><option value="Дзержинск">Дзержинск</option><option value="Дзержинский">Дзержинский</option><option value="Дивногорск">Дивногорск</option><option value="Дигора">Дигора</option><option value="Димитровград">Димитровград</option><option value="Дмитриев">Дмитриев</option><option value="Дмитров">Дмитров</option><option value="Дмитровск">Дмитровск</option><option value="Дно">Дно</option><option value="Добрянка">Добрянка</option><option value="Долгопрудный">Долгопрудный</option><option value="Долинск">Долинск</option><option value="Домодедово">Домодедово</option><option value="Донецк">Донецк</option><option value="Донской">Донской</option><option value="Дорогобуж">Дорогобуж</option><option value="Дрезна">Дрезна</option><option value="Дубна">Дубна</option><option value="Дубовка">Дубовка</option><option value="Дудинка">Дудинка</option><option value="Духовщина">Духовщина</option><option value="Дюртюли">Дюртюли</option><option value="Дятьково">Дятьково</option><option value="Евпатория">Евпатория</option><option value="Егорьевск">Егорьевск</option><option value="Ейск">Ейск</option><option value="Екатеринбург">Екатеринбург</option><option value="Елабуга">Елабуга</option><option value="Елец">Елец</option><option value="Елизово">Елизово</option><option value="Ельня">Ельня</option><option value="Еманжелинск">Еманжелинск</option><option value="Емва">Емва</option><option value="Енисейск">Енисейск</option><option value="Ермолино">Ермолино</option><option value="Ершов">Ершов</option><option value="Ессентуки">Ессентуки</option><option value="Ефремов">Ефремов</option><option value="Железноводск">Железноводск</option><option value="Железногорск">Железногорск</option><option value="Железногорск-Илимский">Железногорск-Илимский</option><option value="Жердевка">Жердевка</option><option value="Жигулёвск">Жигулёвск</option><option value="Жиздра">Жиздра</option><option value="Жирновск">Жирновск</option><option value="Жуков">Жуков</option><option value="Жуковка">Жуковка</option><option value="Жуковский">Жуковский</option><option value="Завитинск">Завитинск</option><option value="Заводоуковск">Заводоуковск</option><option value="Заволжск">Заволжск</option><option value="Заволжье">Заволжье</option><option value="Задонск">Задонск</option><option value="Заинск">Заинск</option><option value="Закаменск">Закаменск</option><option value="Заозёрный">Заозёрный</option><option value="Заозёрск">Заозёрск</option><option value="Западная Двина">Западная Двина</option><option value="Заполярный">Заполярный</option><option value="Зарайск">Зарайск</option><option value="Заречный">Заречный</option><option value="Заринск">Заринск</option><option value="Звенигово">Звенигово</option><option value="Звенигород">Звенигород</option><option value="Зверево">Зверево</option><option value="Зеленогорск">Зеленогорск</option><option value="Зеленоградск">Зеленоградск</option><option value="Зеленодольск">Зеленодольск</option><option value="Зеленокумск">Зеленокумск</option><option value="Зерноград">Зерноград</option><option value="Зея">Зея</option><option value="Зима">Зима</option><option value="Златоуст">Златоуст</option><option value="Злынка">Злынка</option><option value="Змеиногорск">Змеиногорск</option><option value="Знаменск">Знаменск</option><option value="Зубцов">Зубцов</option><option value="Зуевка">Зуевка</option><option value="Ивангород">Ивангород</option><option value="Иваново">Иваново</option><option value="Ивантеевка">Ивантеевка</option><option value="Ивдель">Ивдель</option><option value="Игарка">Игарка</option><option value="Ижевск">Ижевск</option><option value="Избербаш">Избербаш</option><option value="Изобильный">Изобильный</option><option value="Иланский">Иланский</option><option value="Инза">Инза</option><option value="Иннополис">Иннополис</option><option value="Инсар">Инсар</option><option value="Инта">Инта</option><option value="Ипатово">Ипатово</option><option value="Ирбит">Ирбит</option><option value="Иркутск">Иркутск</option><option value="Исилькуль">Исилькуль</option><option value="Искитим">Искитим</option><option value="Истра">Истра</option><option value="Ишим">Ишим</option><option value="Ишимбай">Ишимбай</option><option value="Йошкар-Ола">Йошкар-Ола</option><option value="Кадников">Кадников</option><option value="Казань">Казань</option><option value="Калач">Калач</option><option value="Калач-на-Дону">Калач-на-Дону</option><option value="Калачинск">Калачинск</option><option value="Калининград">Калининград</option><option value="Калининск">Калининск</option><option value="Калтан">Калтан</option><option value="Калуга">Калуга</option><option value="Калязин">Калязин</option><option value="Камбарка">Камбарка</option><option value="Каменка">Каменка</option><option value="Каменногорск">Каменногорск</option><option value="Каменск-Уральский">Каменск-Уральский</option><option value="Каменск-Шахтинский">Каменск-Шахтинский</option><option value="Камень-на-Оби">Камень-на-Оби</option><option value="Камешково">Камешково</option><option value="Камызяк">Камызяк</option><option value="Камышин">Камышин</option><option value="Камышлов">Камышлов</option><option value="Канаш">Канаш</option><option value="Кандалакша">Кандалакша</option><option value="Канск">Канск</option><option value="Карабаново">Карабаново</option><option value="Карабаш">Карабаш</option><option value="Карабулак">Карабулак</option><option value="Карасук">Карасук</option><option value="Карачаевск">Карачаевск</option><option value="Карачев">Карачев</option><option value="Каргат">Каргат</option><option value="Каргополь">Каргополь</option><option value="Карпинск">Карпинск</option><option value="Карталы">Карталы</option><option value="Касимов">Касимов</option><option value="Касли">Касли</option><option value="Каспийск">Каспийск</option><option value="Катав-Ивановск">Катав-Ивановск</option><option value="Катайск">Катайск</option><option value="Качканар">Качканар</option><option value="Кашин">Кашин</option><option value="Кашира">Кашира</option><option value="Кедровый">Кедровый</option><option value="Кемерово">Кемерово</option><option value="Кемь">Кемь</option><option value="Керчь">Керчь</option><option value="Кизел">Кизел</option><option value="Кизилюрт">Кизилюрт</option><option value="Кизляр">Кизляр</option><option value="Кимовск">Кимовск</option><option value="Кимры">Кимры</option><option value="Кингисепп">Кингисепп</option><option value="Кинель">Кинель</option><option value="Кинешма">Кинешма</option><option value="Киреевск">Киреевск</option><option value="Киренск">Киренск</option><option value="Киржач">Киржач</option><option value="Кириллов">Кириллов</option><option value="Кириши">Кириши</option><option value="Киров">Киров</option><option value="Кировград">Кировград</option><option value="Кирово-Чепецк">Кирово-Чепецк</option><option value="Кировск">Кировск</option><option value="Кирс">Кирс</option><option value="Кирсанов">Кирсанов</option><option value="Киселёвск">Киселёвск</option><option value="Кисловодск">Кисловодск</option><option value="Клин">Клин</option><option value="Клинцы">Клинцы</option><option value="Княгинино">Княгинино</option><option value="Ковдор">Ковдор</option><option value="Ковров">Ковров</option><option value="Ковылкино">Ковылкино</option><option value="Когалым">Когалым</option><option value="Кодинск">Кодинск</option><option value="Козельск">Козельск</option><option value="Козловка">Козловка</option><option value="Козьмодемьянск">Козьмодемьянск</option><option value="Кола">Кола</option><option value="Кологрив">Кологрив</option><option value="Коломна">Коломна</option><option value="Колпашево">Колпашево</option><option value="Кольчугино">Кольчугино</option><option value="Коммунар">Коммунар</option><option value="Комсомольск">Комсомольск</option><option value="Комсомольск-на-Амуре">Комсомольск-на-Амуре</option><option value="Конаково">Конаково</option><option value="Кондопога">Кондопога</option><option value="Кондрово">Кондрово</option><option value="Константиновск">Константиновск</option><option value="Копейск">Копейск</option><option value="Кораблино">Кораблино</option><option value="Кореновск">Кореновск</option><option value="Коркино">Коркино</option><option value="Королёв">Королёв</option><option value="Короча">Короча</option><option value="Корсаков">Корсаков</option><option value="Коряжма">Коряжма</option><option value="Костерёво">Костерёво</option><option value="Костомукша">Костомукша</option><option value="Кострома">Кострома</option><option value="Котельники">Котельники</option><option value="Котельниково">Котельниково</option><option value="Котельнич">Котельнич</option><option value="Котлас">Котлас</option><option value="Котово">Котово</option><option value="Котовск">Котовск</option><option value="Кохма">Кохма</option><option value="Красавино">Красавино</option><option value="Красноармейск">Красноармейск</option><option value="Красновишерск">Красновишерск</option><option value="Красногорск">Красногорск</option><option value="Краснодар">Краснодар</option><option value="Краснозаводск">Краснозаводск</option><option value="Краснознаменск">Краснознаменск</option><option value="Краснокаменск">Краснокаменск</option><option value="Краснокамск">Краснокамск</option><option value="Красноперекопск">Красноперекопск</option><option value="Краснослободск">Краснослободск</option><option value="Краснотурьинск">Краснотурьинск</option><option value="Красноуральск">Красноуральск</option><option value="Красноуфимск">Красноуфимск</option><option value="Красноярск">Красноярск</option><option value="Красный Кут">Красный Кут</option><option value="Красный Сулин">Красный Сулин</option><option value="Красный Холм">Красный Холм</option><option value="Кремёнки">Кремёнки</option><option value="Кропоткин">Кропоткин</option><option value="Крымск">Крымск</option><option value="Кстово">Кстово</option><option value="Кубинка">Кубинка</option><option value="Кувандык">Кувандык</option><option value="Кувшиново">Кувшиново</option><option value="Кудрово">Кудрово</option><option value="Кудымкар">Кудымкар</option><option value="Кузнецк">Кузнецк</option><option value="Куйбышев">Куйбышев</option><option value="Кукмор">Кукмор</option><option value="Кулебаки">Кулебаки</option><option value="Кумертау">Кумертау</option><option value="Кунгур">Кунгур</option><option value="Купино">Купино</option><option value="Курган">Курган</option><option value="Курганинск">Курганинск</option><option value="Курильск">Курильск</option><option value="Курлово">Курлово</option><option value="Куровское">Куровское</option><option value="Курск">Курск</option><option value="Куртамыш">Куртамыш</option><option value="Курчалой">Курчалой</option><option value="Курчатов">Курчатов</option><option value="Куса">Куса</option><option value="Кушва">Кушва</option><option value="Кызыл">Кызыл</option><option value="Кыштым">Кыштым</option><option value="Кяхта">Кяхта</option><option value="Лабинск">Лабинск</option><option value="Лабытнанги">Лабытнанги</option><option value="Лагань">Лагань</option><option value="Ладушкин">Ладушкин</option><option value="Лаишево">Лаишево</option><option value="Лакинск">Лакинск</option><option value="Лангепас">Лангепас</option><option value="Лахденпохья">Лахденпохья</option><option value="Лебедянь">Лебедянь</option><option value="Лениногорск">Лениногорск</option><option value="Ленинск">Ленинск</option><option value="Ленинск-Кузнецкий">Ленинск-Кузнецкий</option><option value="Ленск">Ленск</option><option value="Лермонтов">Лермонтов</option><option value="Лесной">Лесной</option><option value="Лесозаводск">Лесозаводск</option><option value="Лесосибирск">Лесосибирск</option><option value="Ливны">Ливны</option><option value="Ликино-Дулёво">Ликино-Дулёво</option><option value="Липецк">Липецк</option><option value="Липки">Липки</option><option value="Лиски">Лиски</option><option value="Лихославль">Лихославль</option><option value="Лобня">Лобня</option><option value="Лодейное Поле">Лодейное Поле</option><option value="Лосино-Петровский">Лосино-Петровский</option><option value="Луга">Луга</option><option value="Луза">Луза</option><option value="Лукоянов">Лукоянов</option><option value="Луховицы">Луховицы</option><option value="Лысково">Лысково</option><option value="Лысьва">Лысьва</option><option value="Лыткарино">Лыткарино</option><option value="Льгов">Льгов</option><option value="Любань">Любань</option><option value="Люберцы">Люберцы</option><option value="Любим">Любим</option><option value="Людиново">Людиново</option><option value="Лянтор">Лянтор</option><option value="Магадан">Магадан</option><option value="Магас">Магас</option><option value="Магнитогорск">Магнитогорск</option><option value="Майкоп">Майкоп</option><option value="Майский">Майский</option><option value="Макаров">Макаров</option><option value="Макарьев">Макарьев</option><option value="Макушино">Макушино</option><option value="Малая Вишера">Малая Вишера</option><option value="Малгобек">Малгобек</option><option value="Малмыж">Малмыж</option><option value="Малоархангельск">Малоархангельск</option><option value="Малоярославец">Малоярославец</option><option value="Мамадыш">Мамадыш</option><option value="Мамоново">Мамоново</option><option value="Мантурово">Мантурово</option><option value="Мариинск">Мариинск</option><option value="Мариинский Посад">Мариинский Посад</option><option value="Маркс">Маркс</option><option value="Махачкала">Махачкала</option><option value="Мглин">Мглин</option><option value="Мегион">Мегион</option><option value="Медвежьегорск">Медвежьегорск</option><option value="Медногорск">Медногорск</option><option value="Медынь">Медынь</option><option value="Межгорье">Межгорье</option><option value="Междуреченск">Междуреченск</option><option value="Мезень">Мезень</option><option value="Меленки">Меленки</option><option value="Мелеуз">Мелеуз</option><option value="Менделеевск">Менделеевск</option><option value="Мензелинск">Мензелинск</option><option value="Мещовск">Мещовск</option><option value="Миасс">Миасс</option><option value="Микунь">Микунь</option><option value="Миллерово">Миллерово</option><option value="Минеральные Воды">Минеральные Воды</option><option value="Минусинск">Минусинск</option><option value="Миньяр">Миньяр</option><option value="Мирный">Мирный</option><option value="Михайлов">Михайлов</option><option value="Михайловка">Михайловка</option><option value="Михайловск">Михайловск</option><option value="Мичуринск">Мичуринск</option><option value="Могоча">Могоча</option><option value="Можайск">Можайск</option><option value="Можга">Можга</option><option value="Моздок">Моздок</option><option value="Мончегорск">Мончегорск</option><option value="Морозовск">Морозовск</option><option value="Моршанск">Моршанск</option><option value="Мосальск">Мосальск</option><option value="Москва">Москва</option><option value="Муравленко">Муравленко</option><option value="Мураши">Мураши</option><option value="Мурино">Мурино</option><option value="Мурманск">Мурманск</option><option value="Муром">Муром</option><option value="Мценск">Мценск</option><option value="Мыски">Мыски</option><option value="Мытищи">Мытищи</option><option value="Мышкин">Мышкин</option><option value="Набережные Челны">Набережные Челны</option><option value="Навашино">Навашино</option><option value="Наволоки">Наволоки</option><option value="Надым">Надым</option><option value="Назарово">Назарово</option><option value="Назрань">Назрань</option><option value="Называевск">Называевск</option><option value="Нальчик">Нальчик</option><option value="Нариманов">Нариманов</option><option value="Наро-Фоминск">Наро-Фоминск</option><option value="Нарткала">Нарткала</option><option value="Нарьян-Мар">Нарьян-Мар</option><option value="Находка">Находка</option><option value="Невель">Невель</option><option value="Невельск">Невельск</option><option value="Невинномысск">Невинномысск</option><option value="Невьянск">Невьянск</option><option value="Нелидово">Нелидово</option><option value="Неман">Неман</option><option value="Нерехта">Нерехта</option><option value="Нерчинск">Нерчинск</option><option value="Нерюнгри">Нерюнгри</option><option value="Нестеров">Нестеров</option><option value="Нефтегорск">Нефтегорск</option><option value="Нефтекамск">Нефтекамск</option><option value="Нефтекумск">Нефтекумск</option><option value="Нефтеюганск">Нефтеюганск</option><option value="Нея">Нея</option><option value="Нижневартовск">Нижневартовск</option><option value="Нижнекамск">Нижнекамск</option><option value="Нижнеудинск">Нижнеудинск</option><option value="Нижние Серги">Нижние Серги</option><option value="Нижний Ломов">Нижний Ломов</option><option value="Нижний Новгород">Нижний Новгород</option><option value="Нижний Тагил">Нижний Тагил</option><option value="Нижняя Салда">Нижняя Салда</option><option value="Нижняя Тура">Нижняя Тура</option><option value="Николаевск">Николаевск</option><option value="Николаевск-на-Амуре">Николаевск-на-Амуре</option><option value="Никольск">Никольск</option><option value="Никольское">Никольское</option><option value="Новая Ладога">Новая Ладога</option><option value="Новая Ляля">Новая Ляля</option><option value="Новоалександровск">Новоалександровск</option><option value="Новоалтайск">Новоалтайск</option><option value="Новоаннинский">Новоаннинский</option><option value="Нововоронеж">Нововоронеж</option><option value="Новодвинск">Новодвинск</option><option value="Новозыбков">Новозыбков</option><option value="Новокубанск">Новокубанск</option><option value="Новокузнецк">Новокузнецк</option><option value="Новокуйбышевск">Новокуйбышевск</option><option value="Новомичуринск">Новомичуринск</option><option value="Новомосковск">Новомосковск</option><option value="Новопавловск">Новопавловск</option><option value="Новоржев">Новоржев</option><option value="Новороссийск">Новороссийск</option><option value="Новосибирск">Новосибирск</option><option value="Новосиль">Новосиль</option><option value="Новосокольники">Новосокольники</option><option value="Новотроицк">Новотроицк</option><option value="Новоузенск">Новоузенск</option><option value="Новоульяновск">Новоульяновск</option><option value="Новоуральск">Новоуральск</option><option value="Новохопёрск">Новохопёрск</option><option value="Новочебоксарск">Новочебоксарск</option><option value="Новочеркасск">Новочеркасск</option><option value="Новошахтинск">Новошахтинск</option><option value="Новый Оскол">Новый Оскол</option><option value="Новый Уренгой">Новый Уренгой</option><option value="Ногинск">Ногинск</option><option value="Нолинск">Нолинск</option><option value="Норильск">Норильск</option><option value="Ноябрьск">Ноябрьск</option><option value="Нурлат">Нурлат</option><option value="Нытва">Нытва</option><option value="Нюрба">Нюрба</option><option value="Нягань">Нягань</option><option value="Нязепетровск">Нязепетровск</option><option value="Няндома">Няндома</option><option value="Облучье">Облучье</option><option value="Обнинск">Обнинск</option><option value="Обоянь">Обоянь</option><option value="Обь">Обь</option><option value="Одинцово">Одинцово</option><option value="Озёрск">Озёрск</option><option value="Озёры">Озёры</option><option value="Октябрьск">Октябрьск</option><option value="Октябрьский">Октябрьский</option><option value="Окуловка">Окуловка</option><option value="Олёкминск">Олёкминск</option><option value="Оленегорск">Оленегорск</option><option value="Олонец">Олонец</option><option value="Омск">Омск</option><option value="Омутнинск">Омутнинск</option><option value="Онега">Онега</option><option value="Опочка">Опочка</option><option value="Орёл">Орёл</option><option value="Оренбург">Оренбург</option><option value="Орехово-Зуево">Орехово-Зуево</option><option value="Орлов">Орлов</option><option value="Орск">Орск</option><option value="Оса">Оса</option><option value="Осинники">Осинники</option><option value="Осташков">Осташков</option><option value="Остров">Остров</option><option value="Островной">Островной</option><option value="Острогожск">Острогожск</option><option value="Отрадное">Отрадное</option><option value="Отрадный">Отрадный</option><option value="Оха">Оха</option><option value="Оханск">Оханск</option><option value="Очёр">Очёр</option><option value="Павлово">Павлово</option><option value="Павловск">Павловск</option><option value="Павловский Посад">Павловский Посад</option><option value="Палласовка">Палласовка</option><option value="Партизанск">Партизанск</option><option value="Певек">Певек</option><option value="Пенза">Пенза</option><option value="Первомайск">Первомайск</option><option value="Первоуральск">Первоуральск</option><option value="Перевоз">Перевоз</option><option value="Пересвет">Пересвет</option><option value="Переславль-Залесский">Переславль-Залесский</option><option value="Пермь">Пермь</option><option value="Пестово">Пестово</option><option value="Петров Вал">Петров Вал</option><option value="Петровск">Петровск</option><option value="Петровск-Забайкальский">Петровск-Забайкальский</option><option value="Петрозаводск">Петрозаводск</option><option value="Петропавловск-Камчатский">Петропавловск-Камчатский</option><option value="Петухово">Петухово</option><option value="Петушки">Петушки</option><option value="Печора">Печора</option><option value="Печоры">Печоры</option><option value="Пикалёво">Пикалёво</option><option value="Пионерский">Пионерский</option><option value="Питкяранта">Питкяранта</option><option value="Плавск">Плавск</option><option value="Пласт">Пласт</option><option value="Плёс">Плёс</option><option value="Поворино">Поворино</option><option value="Подольск">Подольск</option><option value="Подпорожье">Подпорожье</option><option value="Покачи">Покачи</option><option value="Покров">Покров</option><option value="Покровск">Покровск</option><option value="Полевской">Полевской</option><option value="Полесск">Полесск</option><option value="Полысаево">Полысаево</option><option value="Полярные Зори">Полярные Зори</option><option value="Полярный">Полярный</option><option value="Поронайск">Поронайск</option><option value="Порхов">Порхов</option><option value="Похвистнево">Похвистнево</option><option value="Почеп">Почеп</option><option value="Починок">Починок</option><option value="Пошехонье">Пошехонье</option><option value="Правдинск">Правдинск</option><option value="Приволжск">Приволжск</option><option value="Приморск">Приморск</option><option value="Приморско-Ахтарск">Приморско-Ахтарск</option><option value="Приозерск">Приозерск</option><option value="Прокопьевск">Прокопьевск</option><option value="Пролетарск">Пролетарск</option><option value="Протвино">Протвино</option><option value="Прохладный">Прохладный</option><option value="Псков">Псков</option><option value="Пугачёв">Пугачёв</option><option value="Пудож">Пудож</option><option value="Пустошка">Пустошка</option><option value="Пучеж">Пучеж</option><option value="Пушкино">Пушкино</option><option value="Пущино">Пущино</option><option value="Пыталово">Пыталово</option><option value="Пыть-Ях">Пыть-Ях</option><option value="Пятигорск">Пятигорск</option><option value="Радужный">Радужный</option><option value="Райчихинск">Райчихинск</option><option value="Раменское">Раменское</option><option value="Рассказово">Рассказово</option><option value="Ревда">Ревда</option><option value="Реж">Реж</option><option value="Реутов">Реутов</option><option value="Ржев">Ржев</option><option value="Родники">Родники</option><option value="Рославль">Рославль</option><option value="Россошь">Россошь</option><option value="Ростов-на-Дону">Ростов-на-Дону</option><option value="Ростов">Ростов</option><option value="Рошаль">Рошаль</option><option value="Ртищево">Ртищево</option><option value="Рубцовск">Рубцовск</option><option value="Рудня">Рудня</option><option value="Руза">Руза</option><option value="Рузаевка">Рузаевка</option><option value="Рыбинск">Рыбинск</option><option value="Рыбное">Рыбное</option><option value="Рыльск">Рыльск</option><option value="Ряжск">Ряжск</option><option value="Рязань">Рязань</option><option value="Саки">Саки</option><option value="Салават">Салават</option><option value="Салаир">Салаир</option><option value="Салехард">Салехард</option><option value="Сальск">Сальск</option><option value="Самара">Самара</option><option value="Санкт-Петербург">Санкт-Петербург</option><option value="Саранск">Саранск</option><option value="Сарапул">Сарапул</option><option value="Саратов">Саратов</option><option value="Саров">Саров</option><option value="Сасово">Сасово</option><option value="Сатка">Сатка</option><option value="Сафоново">Сафоново</option><option value="Саяногорск">Саяногорск</option><option value="Саянск">Саянск</option><option value="Светлогорск">Светлогорск</option><option value="Светлоград">Светлоград</option><option value="Светлый">Светлый</option><option value="Светогорск">Светогорск</option><option value="Свирск">Свирск</option><option value="Свободный">Свободный</option><option value="Себеж">Себеж</option><option value="Севастополь">Севастополь</option><option value="Северо-Курильск">Северо-Курильск</option><option value="Северобайкальск">Северобайкальск</option><option value="Северодвинск">Северодвинск</option><option value="Североморск">Североморск</option><option value="Североуральск">Североуральск</option><option value="Северск">Северск</option><option value="Севск">Севск</option><option value="Сегежа">Сегежа</option><option value="Сельцо">Сельцо</option><option value="Семёнов">Семёнов</option><option value="Семикаракорск">Семикаракорск</option><option value="Семилуки">Семилуки</option><option value="Сенгилей">Сенгилей</option><option value="Серафимович">Серафимович</option><option value="Сергач">Сергач</option><option value="Сергиев Посад">Сергиев Посад</option><option value="Сердобск">Сердобск</option><option value="Серов">Серов</option><option value="Серпухов">Серпухов</option><option value="Сертолово">Сертолово</option><option value="Сибай">Сибай</option><option value="Сим">Сим</option><option value="Симферополь">Симферополь</option><option value="Сковородино">Сковородино</option><option value="Скопин">Скопин</option><option value="Славгород">Славгород</option><option value="Славск">Славск</option><option value="Славянск-на-Кубани">Славянск-на-Кубани</option><option value="Сланцы">Сланцы</option><option value="Слободской">Слободской</option><option value="Слюдянка">Слюдянка</option><option value="Смоленск">Смоленск</option><option value="Снежинск">Снежинск</option><option value="Снежногорск">Снежногорск</option><option value="Собинка">Собинка</option><option value="Советск">Советск</option><option value="Советская Гавань">Советская Гавань</option><option value="Советский">Советский</option><option value="Сокол">Сокол</option><option value="Солигалич">Солигалич</option><option value="Соликамск">Соликамск</option><option value="Солнечногорск">Солнечногорск</option><option value="Соль-Илецк">Соль-Илецк</option><option value="Сольвычегодск">Сольвычегодск</option><option value="Сольцы">Сольцы</option><option value="Сорочинск">Сорочинск</option><option value="Сорск">Сорск</option><option value="Сортавала">Сортавала</option><option value="Сосенский">Сосенский</option><option value="Сосновка">Сосновка</option><option value="Сосновоборск">Сосновоборск</option><option value="Сосновый Бор">Сосновый Бор</option><option value="Сосногорск">Сосногорск</option><option value="Сочи">Сочи</option><option value="Спас-Деменск">Спас-Деменск</option><option value="Спас-Клепики">Спас-Клепики</option><option value="Спасск">Спасск</option><option value="Спасск-Дальний">Спасск-Дальний</option><option value="Спасск-Рязанский">Спасск-Рязанский</option><option value="Среднеколымск">Среднеколымск</option><option value="Среднеуральск">Среднеуральск</option><option value="Сретенск">Сретенск</option><option value="Ставрополь">Ставрополь</option><option value="Старая Купавна">Старая Купавна</option><option value="Старая Русса">Старая Русса</option><option value="Старица">Старица</option><option value="Стародуб">Стародуб</option><option value="Старый Крым">Старый Крым</option><option value="Старый Оскол">Старый Оскол</option><option value="Стерлитамак">Стерлитамак</option><option value="Стрежевой">Стрежевой</option><option value="Строитель">Строитель</option><option value="Струнино">Струнино</option><option value="Ступино">Ступино</option><option value="Суворов">Суворов</option><option value="Судак">Судак</option><option value="Суджа">Суджа</option><option value="Судогда">Судогда</option><option value="Суздаль">Суздаль</option><option value="Сунжа">Сунжа</option><option value="Суоярви">Суоярви</option><option value="Сураж">Сураж</option><option value="Сургут">Сургут</option><option value="Суровикино">Суровикино</option><option value="Сурск">Сурск</option><option value="Сусуман">Сусуман</option><option value="Сухиничи">Сухиничи</option><option value="Сухой Лог">Сухой Лог</option><option value="Сызрань">Сызрань</option><option value="Сыктывкар">Сыктывкар</option><option value="Сысерть">Сысерть</option><option value="Сычёвка">Сычёвка</option><option value="Сясьстрой">Сясьстрой</option><option value="Тавда">Тавда</option><option value="Таганрог">Таганрог</option><option value="Тайга">Тайга</option><option value="Тайшет">Тайшет</option><option value="Талдом">Талдом</option><option value="Талица">Талица</option><option value="Тамбов">Тамбов</option><option value="Тара">Тара</option><option value="Тарко-Сале">Тарко-Сале</option><option value="Таруса">Таруса</option><option value="Татарск">Татарск</option><option value="Таштагол">Таштагол</option><option value="Тверь">Тверь</option><option value="Теберда">Теберда</option><option value="Тейково">Тейково</option><option value="Темников">Темников</option><option value="Темрюк">Темрюк</option><option value="Терек">Терек</option><option value="Тетюши">Тетюши</option><option value="Тимашёвск">Тимашёвск</option><option value="Тихвин">Тихвин</option><option value="Тихорецк">Тихорецк</option><option value="Тобольск">Тобольск</option><option value="Тогучин">Тогучин</option><option value="Тольятти">Тольятти</option><option value="Томари">Томари</option><option value="Томмот">Томмот</option><option value="Томск">Томск</option><option value="Топки">Топки</option><option value="Торжок">Торжок</option><option value="Торопец">Торопец</option><option value="Тосно">Тосно</option><option value="Тотьма">Тотьма</option><option value="Трёхгорный">Трёхгорный</option><option value="Троицк">Троицк</option><option value="Трубчевск">Трубчевск</option><option value="Туапсе">Туапсе</option><option value="Туймазы">Туймазы</option><option value="Тула">Тула</option><option value="Тулун">Тулун</option><option value="Туран">Туран</option><option value="Туринск">Туринск</option><option value="Тутаев">Тутаев</option><option value="Тында">Тында</option><option value="Тырныауз">Тырныауз</option><option value="Тюкалинск">Тюкалинск</option><option value="Тюмень">Тюмень</option><option value="Уварово">Уварово</option><option value="Углегорск">Углегорск</option><option value="Углич">Углич</option><option value="Удачный">Удачный</option><option value="Удомля">Удомля</option><option value="Ужур">Ужур</option><option value="Узловая">Узловая</option><option value="Улан-Удэ">Улан-Удэ</option><option value="Ульяновск">Ульяновск</option><option value="Унеча">Унеча</option><option value="Урай">Урай</option><option value="Урень">Урень</option><option value="Уржум">Уржум</option><option value="Урус-Мартан">Урус-Мартан</option><option value="Урюпинск">Урюпинск</option><option value="Усинск">Усинск</option><option value="Усмань">Усмань</option><option value="Усолье-Сибирское">Усолье-Сибирское</option><option value="Усолье">Усолье</option><option value="Уссурийск">Уссурийск</option><option value="Усть-Джегута">Усть-Джегута</option><option value="Усть-Илимск">Усть-Илимск</option><option value="Усть-Катав">Усть-Катав</option><option value="Усть-Кут">Усть-Кут</option><option value="Усть-Лабинск">Усть-Лабинск</option><option value="Устюжна">Устюжна</option><option value="Уфа">Уфа</option><option value="Ухта">Ухта</option><option value="Учалы">Учалы</option><option value="Уяр">Уяр</option><option value="Фатеж">Фатеж</option><option value="Феодосия">Феодосия</option><option value="Фокино">Фокино</option><option value="Фролово">Фролово</option><option value="Фрязино">Фрязино</option><option value="Фурманов">Фурманов</option><option value="Хабаровск">Хабаровск</option><option value="Хадыженск">Хадыженск</option><option value="Ханты-Мансийск">Ханты-Мансийск</option><option value="Харабали">Харабали</option><option value="Харовск">Харовск</option><option value="Хасавюрт">Хасавюрт</option><option value="Хвалынск">Хвалынск</option><option value="Хилок">Хилок</option><option value="Химки">Химки</option><option value="Холм">Холм</option><option value="Холмск">Холмск</option><option value="Хотьково">Хотьково</option><option value="Цивильск">Цивильск</option><option value="Цимлянск">Цимлянск</option><option value="Циолковский">Циолковский</option><option value="Чадан">Чадан</option><option value="Чайковский">Чайковский</option><option value="Чапаевск">Чапаевск</option><option value="Чаплыгин">Чаплыгин</option><option value="Чебаркуль">Чебаркуль</option><option value="Чебоксары">Чебоксары</option><option value="Чегем">Чегем</option><option value="Чекалин">Чекалин</option><option value="Челябинск">Челябинск</option><option value="Чердынь">Чердынь</option><option value="Черемхово">Черемхово</option><option value="Черепаново">Черепаново</option><option value="Череповец">Череповец</option><option value="Черкесск">Черкесск</option><option value="Чёрмоз">Чёрмоз</option><option value="Черноголовка">Черноголовка</option><option value="Черногорск">Черногорск</option><option value="Чернушка">Чернушка</option><option value="Черняховск">Черняховск</option><option value="Чехов">Чехов</option><option value="Чистополь">Чистополь</option><option value="Чита">Чита</option><option value="Чкаловск">Чкаловск</option><option value="Чудово">Чудово</option><option value="Чулым">Чулым</option><option value="Чусовой">Чусовой</option><option value="Чухлома">Чухлома</option><option value="Шагонар">Шагонар</option><option value="Шадринск">Шадринск</option><option value="Шали">Шали</option><option value="Шарыпово">Шарыпово</option><option value="Шарья">Шарья</option><option value="Шатура">Шатура</option><option value="Шахты">Шахты</option><option value="Шахунья">Шахунья</option><option value="Шацк">Шацк</option><option value="Шебекино">Шебекино</option><option value="Шелехов">Шелехов</option><option value="Шенкурск">Шенкурск</option><option value="Шилка">Шилка</option><option value="Шимановск">Шимановск</option><option value="Шиханы">Шиханы</option><option value="Шлиссельбург">Шлиссельбург</option><option value="Шумерля">Шумерля</option><option value="Шумиха">Шумиха</option><option value="Шуя">Шуя</option><option value="Щёкино">Щёкино</option><option value="Щёлкино">Щёлкино</option><option value="Щёлково">Щёлково</option><option value="Щигры">Щигры</option><option value="Щучье">Щучье</option><option value="Электрогорск">Электрогорск</option><option value="Электросталь">Электросталь</option><option value="Электроугли">Электроугли</option><option value="Элиста">Элиста</option><option value="Энгельс">Энгельс</option><option value="Эртиль">Эртиль</option><option value="Югорск">Югорск</option><option value="Южа">Южа</option><option value="Южно-Сахалинск">Южно-Сахалинск</option><option value="Южно-Сухокумск">Южно-Сухокумск</option><option value="Южноуральск">Южноуральск</option><option value="Юрга">Юрга</option><option value="Юрьев-Польский">Юрьев-Польский</option><option value="Юрьевец">Юрьевец</option><option value="Юрюзань">Юрюзань</option><option value="Юхнов">Юхнов</option><option value="Ядрин">Ядрин</option><option value="Якутск">Якутск</option><option value="Ялта">Ялта</option><option value="Ялуторовск">Ялуторовск</option><option value="Янаул">Янаул</option><option value="Яранск">Яранск</option><option value="Яровое">Яровое</option><option value="Ярославль">Ярославль</option><option value="Ярцево">Ярцево</option><option value="Ясногорск">Ясногорск</option><option value="Ясный">Ясный</option><option value="Яхрома">Яхрома</option>';
    var days = '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>';
    var month = '<option value="1">Январь</option><option value="2">Февраль</option><option value="3">Март</option><option value="4">Апрель</option><option value="5">Май</option><option value="6">Июнь</option><option value="7">Июль</option><option value="8">Август</option><option value="9">Сентябрь</option><option value="10">Октябрь</option><option value="11">Новябрь</option><option value="12">Декабрь</option>';
    $('#year').html(goda);
    $('#city').html(goroda);
    $('#day').html(days);
    $('#month').html(month);
    $('.ox__formcontrol').each(function () {
        var MyPh = $(this).attr('placeholder');
        $(this).on('focus', function () {
            $(this).attr('placeholder', '');
            $(this).removeClass('wpcf7-not-valid');
        });
        $(this).on('blur', function () {
            $(this).attr('placeholder', MyPh);
        });
    });
    Inputmask({regex: "[A-я]*"}).mask('#name, #lastname, #surname');
    //$().inputmask("А-я");
    $('#start').click(function (e) {
        e.preventDefault();
        var name = $('#name').val();
        var lastname = $('#lastname').val();
        var surname = $('#surname').val();
        var city = $('#city').val();
        if (name && lastname && surname && city) {
            sendAjaxForm('result_form', 'ajax_form', '/ox_gad/goroskop/kakaya-professiya-podhodit/js/text.php');
            return false;
        } else {
            Swal.fire({
                type: 'error',
                title: 'Упс!',
                text: 'Вы не заполнили все поля!',
            })
        }
    });
    $('#reset').click(function () {
        location.reload();
    });
});

function sendAjaxForm(result_form, ajax_form, url) {
    myAjax().done(showRezult);

    function myAjax() {
        var dfd = new $.Deferred();
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: {
                'name': $('#name').val(),
                'lastname': $('#lastname').val(),
                'surname': $('#surname').val(),
                'city': $('#city').val(),
                'day': $('#day').val(),
                'month': $('#month').val(),
                'year': $('#year').val(),
            },
            success: function (response) { // если запрос успешен вызываем функцию
                result = $.parseJSON(response);
                dfd.resolve(result);
            }
        });
        return dfd.promise();
    }

    function showRezult(selected_card) {
        var prof_g_one = result.prof_one_good.prof;
        var prof_g_one_desc = result.prof_one_good.prof_desc;
        var prof_g_two = result.prof_two_good.prof;
        var prof_g_two_desc = result.prof_two_good.prof_desc;

        var b_o = '';
        var b_t = '';
        if (result.prof_one_bad.prof) {
            var prof_b_one = result.prof_one_bad.prof;
            var prof_b_one_desc = result.prof_one_bad.prof_desc;
            if (prof_b_one && prof_g_one != prof_b_one && prof_g_two != prof_b_one) {
                var b_o = '<div class="rezult-list__item bad">\
	            	<div class="rezult-list__title">Вам не подойдет профессия: <span>' + prof_b_one + '</span></div> \
	            	<div class="rezult-list__content">' + prof_b_one_desc + '</div>\
	        	</div> ';
            }
        }
        if (result.prof_two_bad.prof) {
            var prof_b_two = result.prof_two_bad.prof;
            var prof_b_two_desc = result.prof_two_bad.prof_desc;
            if (prof_b_two && prof_b_one != prof_b_two && prof_g_one != prof_b_two && prof_g_two != prof_b_two) {
                var b_t = '<div class="rezult-list__item bad">\
	            	<div class="rezult-list__title">Вам не подойдет профессия: <span>' + prof_b_two + '</span></div> \
	            	<div class="rezult-list__content">' + prof_b_two_desc + '</div>\
	            	</div> ';
            }
        }
        //console.log(result);


        var showHtml = '<div class="rezult-list"> \
                            <div class="rezult-list__cardtitle">' + result.name + ', посмотри направления, подходящие тебе:</div>\
	                        <div class="rezult-list__info"> \
                            <div class="prof">\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Актер</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Военный</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Врач</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Инженер</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Музыкант</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Политик</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Учитель</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Художник</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        	<div class="prof__item">\
	                        		<div class="prof__title">Юрист</div>\
	                        		<div class="prof__line"></div>\
	                        	</div>\
	                        </div>\
	                       	<div class="rezult-list__item good">\
	                        	<div class="rezult-list__title">Вам подойдет профессия: <span>' + prof_g_one + '</span></div> \
                            	<div class="rezult-list__content">' + prof_g_one_desc + '</div>\
                            </div> \
                            <div class="rezult-list__item good">\
                            	<div class="rezult-list__title">Вам подойдет профессия: <span>' + prof_g_two + '</span></div> \
                            	<div class="rezult-list__content">' + prof_g_two_desc + '</div>\
                        	</div>' + b_o + b_t + '</div>\
                        	<div class="rezult-list__desc">\
                        		<p><span style="color:green"><b>Зеленые полоски</b></span> - это то, что возможно развить, к чему есть склонность, это те умения, которые являются базовыми и развиваются с минимальными затратами усилий</p>\
                        		<p><b>Отсутсвие полоски</b> - это то, что возможно развить, к чему есть склонность, это те умения, которые являются базовыми и развиваются с минимальными затратами усилий</p>\
                        		<p><span style="color:red"><b>Красные полоски</b></span> - это умения, которые развить достаточно трудно, на их проработку уходит масса энергии, времени и усилий, в этой инкарнации их развитие практически не предусмотрено</p>\
                        	</div>\
                    </div>';
        setTimeout(function () {
            $('#showRezult').html(showHtml);
            $('#ox__rezult').slideDown(250);
            $('.ox_form').slideUp(250);
        }, 500);
        setTimeout(function () {
            $('.prof__item:contains(' + prof_g_one + ')').addClass('active');
        }, 750);
        setTimeout(function () {
            $('.prof__item:contains(' + prof_g_two + ')').addClass('active');
        }, 950);
        if (prof_b_one && prof_g_one != prof_b_one && prof_g_two != prof_b_one) {
            setTimeout(function () {
                $('.prof__item:contains(' + prof_b_one + ')').addClass('bad');
            }, 1250);
        }
        if (prof_b_one && prof_b_one != prof_b_two && prof_g_one != prof_b_two && prof_g_two != prof_b_two) {
            setTimeout(function () {
                $('.prof__item:contains(' + prof_b_two + ')').addClass('bad');
            }, 1550);
        }
        setTimeout(function () {
            $('.rezult-list__item').slideDown(250);
        }, 1750);
    }
}