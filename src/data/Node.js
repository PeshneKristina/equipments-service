export class Node{
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }

    setParent(p){
        this.parent = p;
    }

    addChild(child){
        this.children.push(child);
    }
}