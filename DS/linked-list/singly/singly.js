export class SinglyListNode {
    #nodeData;
    #nextNode;

    constructor(data) {
        this.#nodeData = data;

        this.#nextNode = null;
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
}

export class SinglyLinkedList {
    #headNode = null;
    #tailNode = null;
    listLength = 0;

    constructor(data = null) {
        if (data === null) {
            this.#headNode = null;
            this.#tailNode = null;
            return;
        }

        const newNode = new SinglyListNode(data);
        this.#headNode = newNode;
        this.#tailNode = newNode;
        this.listLength = 1;
    }

    #setInitialNode(node) {
        this.#headNode = node;
        this.#tailNode = node;
    }

    addNode(data) {
        const newNode = new SinglyListNode(data);
        this.listLength += 1;

        if (this.#tailNode) {
            this.#tailNode.next = newNode;
            this.#tailNode = newNode;
            return;
        }

        return this.#setInitialNode(newNode);
    }
    addNodeToStart(data) {
        this.listLength += 1;
        const newNode = new SinglyListNode(data);
        if (this.#headNode) {
            newNode.next = this.#headNode;
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

        let element = this.#headNode.next;
        for (let i = 3; i <= positionToFind; i++) {
            element = element?.next || null;
        }

        return element?.data || null;
    }

    deleteFirstNode() {
        if (this.#headNode) {
            const headNode = this.#headNode;

            this.#headNode = headNode.next;
            headNode.next = null;

            if (this.headNode === null) {
                this.tailNode = null;
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

        let currentNode = this.#headNode;

        while (currentNode.next?.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = null;
        this.#tailNode = currentNode;

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

        let element = this.#headNode;
        for (let i = 2; i < positionToDelete; i++) {
            element = element?.next ?? null;

            if (element === null) break;
        }

        if (element === null) return false;

        const deletedElement = element.next;
        if (deletedElement) {
            element.next = deletedElement.next;
            deletedElement.next = null;

            if (element.next === null) this.#tailNode = element;

            this.listLength = this.listLength - 1;

        } else return false;

        return true;
    }

    deleteNodeWithData(searchData) {
        if (this.#headNode) {
            if (this.#headNode.data === searchData) {
                return this.deleteFirstNode();
            }

            let currentNode = this.#headNode.next;

            while (currentNode !== null) {
                if (currentNode.next?.data === searchData) {
                    const nodeToDelete = currentNode.next;

                    currentNode.next = nodeToDelete?.next ?? null;
                    if (currentNode.next === null) {
                        this.#tailNode = currentNode;
                    }

                    nodeToDelete.next = null;

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
            return;
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

const newList = new SinglyLinkedList(2);

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

