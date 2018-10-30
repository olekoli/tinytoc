
class TocGenerator {

    public tocSource: string;
    public tocTarget: string;
    public tocTags: any;
    public listType: string;
    public linkItems: boolean;

    constructor(tocSource: string, tocTarget: string,
                {tags, listType, linkItems}: { tags?: string[], listType?: string, linkItems?: boolean}) {
        this.tocSource = tocSource;
        this.tocTarget = tocTarget;
        this.tocTags = tags ? tags : ["h2", "h3", "h4", "h5", "h6"];
        this.listType = listType ? listType : "ul";
        this.linkItems = linkItems ? linkItems : true;
    }

    public generate(): void {
        const tocContainer = document.querySelector(`${this.tocTarget}`);
        const sourceContainer = document.querySelector(`${this.tocSource}`);

        if (!tocContainer) { throw new Error(`Specified target div (selector: ${this.tocTarget}) not found`); }
        if (!sourceContainer) { throw new Error(`Specified source div (selector: ${this.tocSource}) not found`); }

        let headings = Array.prototype.slice.call(sourceContainer.querySelectorAll(this.tocTags));

        if (headings.length === 0) {
            throw new Error(`Did not find any headings (${this.tocTags}) in ${this.tocSource}`);
        }

        let mainListContainer = document.createElement(this.listType);
        tocContainer.appendChild(mainListContainer);
        let topLevel: number;
        headings = headings.map((h: any, index: number) => {
            const level: number = parseInt(h.tagName[1], 10);

            if (!topLevel || level <= topLevel) { topLevel = level; }

            const elem = document.createElement("li");

            if (this.linkItems) {
                const link = document.createElement("a");
                const slug: string = `${this.slugify(h.innerText)}-${index}`;
                link.setAttribute("href", `#${slug}`);
                link.innerText = h.innerText;
                h.setAttribute("id", slug);
                elem.appendChild(link);
            } else {
                elem.innerText = h.innerText;
            }
            return { elem, level };
        });
        headings.forEach((h: any) => {
            let levelDifference: number = h.level - topLevel;
            if (levelDifference > 0) {
                const containerNode = mainListContainer.lastChild;
                const listNode = document.createElement(this.listType);
                containerNode.appendChild(listNode);
                mainListContainer = listNode;
                topLevel = h.level;
            }
            if (levelDifference < 0) {
                while (0 !== levelDifference++) {
                    try {
                        mainListContainer = mainListContainer.parentElement.parentElement;
                    } catch (error) {
                        continue;
                    }
                }
            }

            mainListContainer.appendChild(h.elem);
        });

    }

    private slugify(heading: string): string {
        const a = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
        const b = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
        const p = new RegExp(a.split("").join("|"), "g");
        return heading.toString().toLowerCase()
          .replace(/\s+/g, "-")
          .replace(p, (c) => b.charAt(a.indexOf(c)))
          .replace(/&/g, "-and-")
          .replace(/[^\w\-]+/g, "") // es-lint-disable-line no-useless-escape
          .replace(/\-\-+/g, "-") // es-lint-disable-line no-useless-escape
          .replace(/^-+/, "");
    }
}


export default TocGenerator; 