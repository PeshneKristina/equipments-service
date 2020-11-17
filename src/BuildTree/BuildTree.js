import Node from "./Node.js";


export default function buildTree(data) {
    let childToParent = new Map();
    let withoutParents = new Map();
    for (let obj of data) {

        let node = new Node(obj);
        let parent = childToParent.get(node.data.id);
        if (parent !== undefined) {
            childToParent.delete(node.data.id);
            node.setParent(parent);
            parent.addChild(node);

        } else {
            withoutParents.set(node.data.id, node);

        }

        if (obj.parts !== undefined) {
            for (let part of obj.parts) {
                let child = withoutParents.get(part);
                if (child !== undefined) {
                    node.addChild(child);
                    child.setParent(node);
                    withoutParents.delete(child.data.id);
                } else {
                    childToParent.set(part, node);
                }

            }
        }
    }

    return Array.from(withoutParents.values());
}




