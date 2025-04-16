export class DoublyListNode {
    #nodeData;
    #nextNode;
    #prevNode;

    constructor(data) {
        this.#nodeData = data;

        this.#nextNode = this.#prevNode = null;
    }

    get data() {
        return this.#nodeData;
    }

    get next() {
        return this.#nextNode;
    }

    set next(node) {
        this.#nextNode = node ?? null;
    }

    get previous() {
        return this.#prevNode;
    }

    set previous(node) {
        this.#prevNode = node ?? null;
    }
}

export class DoublyLinkedList {
    #headNode;
    #tailNode;
    listLength = 0;

    constructor(data = null) {
        if (data === null) {
            this.#headNode = null;
            this.#tailNode = null;
            return;
        }

        const newNode = new DoublyListNode(data);
        this.#headNode = newNode;
        this.#tailNode = newNode;

        this.listLength = 1;
    }

    #setInitialNode(node) {
        this.#headNode = node;
        this.#tailNode = node;
    }

    addNode(data) {
        const newNode = new DoublyListNode(data);
        this.listLength += 1;

        if (this.#tailNode) {
            this.#tailNode.next = newNode;
            newNode.previous = this.#tailNode;

            this.#tailNode = newNode;
            return;
        }

        return this.#setInitialNode(newNode);
    }

    addNodeToStart(data) {
        this.listLength += 1;
        const newNode = new DoublyListNode(data);
        if (this.#headNode) {
            newNode.next = this.#headNode;
            this.#headNode.previous = newNode;

            this.#headNode = newNode;
            return;
        }

        return this.#setInitialNode(newNode);
    }

    searchForData(searchData) {
        if (this.#headNode) {
            if (this.#headNode.data === searchData) {
                return true;
            } else if (this.#headNode !== this.#tailNode && this.#tailNode?.data === searchData) {
                return true;
            }

            let currentNode = this.#headNode.next;

            while (currentNode !== null) {
                if (currentNode.data === searchData) {
                    return true;
                }

                currentNode = currentNode.next;
                if (currentNode === this.#tailNode) {
                    break;
                }
            }
        }

        return false;
    }

    getFirstNode() {
        return this.#headNode === null ? null : this.#headNode.data;
    }

    getLastNode() {
        return this.#tailNode === null ? null : this.#tailNode.data;
    }

    getNodeInPosition(positionToFind) {
        if (!this.#headNode) return null;
        if (positionToFind < 1) return null;
        if (this.listLength < positionToFind) return null;

        if (positionToFind === 1) return this.#headNode.data;
        if (positionToFind === this.listLength) return this.#tailNode?.data;
        if (positionToFind === this.listLength - 1) return this.#tailNode?.previous?.data;

        let element = this.#headNode.next;
        for (let i = 2; i <= positionToFind; i++) {
            element = element?.next || null;
        }

        return element?.data || null;
    }

    deleteFirstNode() {
        if (this.#headNode) {
            const headNode = this.#headNode;

            headNode.next ? headNode.next.previous = null : undefined;
            this.#headNode = headNode.next;
            headNode.next = null;

            if (this.#headNode === null) {
                this.#tailNode = null;
            }

            this.listLength -= 1;

            return true;
        }

        return false;
    }

    deleteLastNode() {
        if (this.#headNode === this.#tailNode) {
            return this.deleteFirstNode();
        }

        const nodeToDelete = this.#tailNode;
        const newLastNode = this.#tailNode?.previous;

        newLastNode ? newLastNode.next = null : undefined;
        nodeToDelete ? nodeToDelete.previous = null : undefined;

        newLastNode ? this.#tailNode = newLastNode : undefined;

        this.listLength -= 1;

        return false;
    }

    deleteNodeInPosition(positionToDelete) {
        if (!this.#headNode) return false;
        if (positionToDelete < 1) return false;
        if (this.listLength < positionToDelete) return false;

        if (positionToDelete === 1) {
            return this.deleteFirstNode()
        } else if (positionToDelete === this.listLength) {
            return this.deleteLastNode();
        };

        let previousElement = this.#headNode;
        for (let i = 2; i < positionToDelete; i++) {
            previousElement = previousElement?.next ?? null;

            if (previousElement === null) break;
        }

        if (previousElement === null) return false;

        const nodeToDelete = previousElement.next;
        if (nodeToDelete) {
            const nextElement = nodeToDelete.next;

            previousElement.next = nextElement;
            nextElement ? nextElement.previous = previousElement : undefined;

            nodeToDelete.next = null;
            nodeToDelete.previous = null;

            if (previousElement.next === null) this.#tailNode = previousElement;

            this.listLength = this.listLength - 1;

        } else return false;

        return true;
    }

    deleteNodeWithData(searchData) {
        if (this.#headNode) {
            if (this.#headNode.data === searchData) return this.deleteFirstNode();
            if (this.#tailNode?.data === searchData) return this.deleteLastNode();

            let currentNode = this.#headNode.next;

            while (currentNode !== null) {
                if (currentNode.data === searchData) {
                    const nodeToDelete = currentNode;

                    const nextNode = nodeToDelete.next;
                    const previousNode = nodeToDelete.previous;

                    previousNode ? previousNode.next = nodeToDelete.next : undefined;
                    nextNode ? nextNode.previous = previousNode : undefined;

                    nodeToDelete.next = null;
                    nodeToDelete.previous = null;

                    this.listLength -= 1;

                    return true;
                }

                currentNode = currentNode.next;
            }
        }

        return false;
    }

    displayList() {
        let displayString = '';

        if (this.#headNode === null) {
            console.log('The list is empty');
            return '';
        }

        let currentNode = this.#headNode;

        while (currentNode !== null) {
            displayString += currentNode.data;
            currentNode = currentNode.next;

            if (currentNode !== null) {
                displayString += '-->'
            }
        }

        return displayString;
    }
}

export default DoublyLinkedList;

const newList = new DoublyLinkedList(2);

newList.addNodeToStart(1);
newList.addNode(3);
newList.addNode(4);
newList.addNode(5);
newList.addNode(6);
newList.addNode(7);
newList.addNode(8);
newList.addNode(9);
newList.addNode(10);

newList.deleteNodeWithData(8);
console.log(newList.displayList());

newList.deleteNodeInPosition(8);
console.log(newList.displayList());

newList.deleteLastNode();
console.log(newList.displayList());

newList.deleteFirstNode();
console.log(newList.displayList());

newList.addNodeToStart(1);
console.log(newList.displayList());

console.log(newList.getFirstNode());
console.log(newList.getLastNode());
console.log(newList.getNodeInPosition(2));
console.log(newList.searchForData(4));