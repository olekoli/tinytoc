"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TocGenerator = /** @class */ (function () {
    function TocGenerator(tocSource, tocTarget, _a) {
        var tags = _a.tags, listType = _a.listType, linkItems = _a.linkItems;
        this.tocSource = tocSource;
        this.tocTarget = tocTarget;
        this.tocTags = tags ? tags : ["h2", "h3", "h4", "h5", "h6"];
        this.listType = listType ? listType : "ul";
        this.linkItems = linkItems ? linkItems : true;
    }
    TocGenerator.prototype.generate = function () {
        var _this = this;
        var tocContainer = document.querySelector("" + this.tocTarget);
        var sourceContainer = document.querySelector("" + this.tocSource);
        if (!tocContainer) {
            throw new Error("Specified target div (selector: " + this.tocTarget + ") not found");
        }
        if (!sourceContainer) {
            throw new Error("Specified source div (selector: " + this.tocSource + ") not found");
        }
        var headings = Array.prototype.slice.call(sourceContainer.querySelectorAll(this.tocTags));
        if (headings.length === 0) {
            throw new Error("Did not find any headings (" + this.tocTags + ") in " + this.tocSource);
        }
        var mainListContainer = document.createElement(this.listType);
        tocContainer.appendChild(mainListContainer);
        var topLevel;
        headings = headings.map(function (h, index) {
            var level = parseInt(h.tagName[1], 10);
            if (!topLevel || level <= topLevel) {
                topLevel = level;
            }
            var elem = document.createElement("li");
            if (_this.linkItems) {
                var link = document.createElement("a");
                var slug = _this.slugify(h.innerText) + "-" + index;
                link.setAttribute("href", "#" + slug);
                link.innerText = h.innerText;
                h.setAttribute("id", slug);
                elem.appendChild(link);
            }
            else {
                elem.innerText = h.innerText;
            }
            return { elem: elem, level: level };
        });
        headings.forEach(function (h) {
            var levelDifference = h.level - topLevel;
            if (levelDifference > 0) {
                var containerNode = mainListContainer.lastChild;
                var listNode = document.createElement(_this.listType);
                containerNode.appendChild(listNode);
                mainListContainer = listNode;
                topLevel = h.level;
            }
            if (levelDifference < 0) {
                while (0 !== levelDifference++) {
                    try {
                        mainListContainer = mainListContainer.parentElement.parentElement;
                    }
                    catch (error) {
                        continue;
                    }
                }
            }
            mainListContainer.appendChild(h.elem);
        });
    };
    TocGenerator.prototype.slugify = function (heading) {
        var a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
        var b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
        var p = new RegExp(a.split("").join("|"), "g");
        return heading.toString().toLowerCase()
            .replace(/\s+/g, "-")
            .replace(p, function (c) { return b.charAt(a.indexOf(c)); })
            .replace(/&/g, "-and-")
            .replace(/[^\w\-]+/g, "") // es-lint-disable-line no-useless-escape
            .replace(/\-\-+/g, "-") // es-lint-disable-line no-useless-escape
            .replace(/^-+/, "");
    };
    return TocGenerator;
}());
exports.default = TocGenerator;
