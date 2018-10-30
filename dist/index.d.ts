declare class TinyToc {
    tocSource: string;
    tocTarget: string;
    tocTags: any;
    listType: string;
    linkItems: boolean;
    constructor(tocSource: string, tocTarget: string, { tags, listType, linkItems }: {
        tags?: string[];
        listType?: string;
        linkItems?: boolean;
    });
    generate(): void;
    private slugify;
}
export default TinyToc;
