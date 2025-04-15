export class DoublyListNode {
    private nodeData: unknown;
    private nextNode!: DoublyListNode | null;
    private prevNode!: DoublyListNode | null;

    constructor(data: unknown) {
        this.nodeData = data;

        this.nextNode = this.prevNode = null;
    }

    public get data(): unknown {
        return this.nodeData;
    }

    public get next(): DoublyListNode | null {
        return this.nextNode;
    }

    public set next(node: DoublyListNode | null) {
        this.nextNode = node ?? null;
    }

    public get previous(): DoublyListNode | null {
        return this.prevNode;
    }

    public set previous(node: DoublyListNode | null) {
        this.prevNode = node ?? null;
    }
}

export class DoublyLinkedList {
    private headNode: DoublyListNode | null;
    private tailNode: DoublyListNode | null;
    public listLength = 0;

    constructor(data: unknown = null) {
        if (data === null) {
            this.headNode = null;
            this.tailNode = null;
            return;
        }

        const newNode = new DoublyListNode(data);
        this.headNode = newNode;
        this.tailNode = newNode;

        this.listLength = 1;
    }

    private setInitialNode(node: DoublyListNode) {
        this.headNode = node;
        this.tailNode = node;
    }

    public addNode(data: unknown) {
        const newNode = new DoublyListNode(data);
        this.listLength += 1;

        if (this.tailNode) {
            this.tailNode.next = newNode;
            newNode.previous = this.tailNode;

            this.tailNode = newNode;
            return;
        }

        return this.setInitialNode(newNode);
    }

    public addNodeToStart(data: unknown) {
        this.listLength += 1;
        const newNode = new DoublyListNode(data);
        if (this.headNode) {
            newNode.next = this.headNode;
            this.headNode.previous = newNode;

            this.headNode = newNode;
            return;
        }

        return this.setInitialNode(newNode);
    }

    public searchForData(searchData: unknown): boolean {
        if (this.headNode) {
            if (this.headNode.data === searchData) {
                return true;
            } else if (this.headNode !== this.tailNode && this.tailNode?.data === searchData) {
                return true;
            }

            let currentNode = this.headNode.next;

            while (currentNode !== null) {
                if (currentNode.data === searchData) {
                    return true;
                }

                currentNode = currentNode.next;
                if (currentNode === this.tailNode) {
                    break;
                }
            }
        }

        return false;
    }

    public getFirstNode(): unknown | null {
        return this.headNode === null ? null : this.headNode.data;
    }

    public getLastNode(): unknown | null {
        return this.tailNode === null ? null : this.tailNode.data;
    }

    public getNodeInPosition(positionToFind: number): unknown | null {
        if (!this.headNode) return null;
        if (positionToFind < 1) return null;
        if (this.listLength < positionToFind) return null;

        if (positionToFind === 1) return this.headNode.data;
        if (positionToFind === this.listLength) return this.tailNode?.data;
        if (positionToFind === this.listLength - 1) return this.tailNode?.previous?.data;

        let element = this.headNode.next;
        for (let i = 2; i <= positionToFind; i++) {
            element = element?.next || null;
        }

        return element?.data || null;
    }

    public deleteFirstNode(): boolean {
        if (this.headNode) {
            const headNode = this.headNode;

            headNode.next ? headNode.next.previous = null : undefined;
            this.headNode = headNode.next;
            headNode.next = null;

            if (this.headNode === null) {
                this.tailNode = null;
            }

            this.listLength -= 1;

            return true;
        }

        return false;
    }

    public deleteLastNode(): boolean {
        if (this.headNode === this.tailNode) {
            return this.deleteFirstNode();
        }

        const nodeToDelete = this.tailNode;
        const newLastNode = this.tailNode?.previous;

        newLastNode ? newLastNode.next = null : undefined;
        nodeToDelete ? nodeToDelete.previous = null : undefined;

        newLastNode ? this.tailNode = newLastNode : undefined;

        this.listLength -= 1;

        return false;
    }

    public deleteNodeInPosition(positionToDelete: number): boolean {
        if (!this.headNode) return false;
        if (positionToDelete < 1) return false;
        if (this.listLength < positionToDelete) return false;

        if (positionToDelete === 1) {
            return this.deleteFirstNode()
        } else if (positionToDelete === this.listLength) {
            return this.deleteLastNode();
        };

        let previousElement: DoublyListNode | null = this.headNode;
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

            if (previousElement.next === null) this.tailNode = previousElement;

            this.listLength = this.listLength - 1;

        } else return false;

        return true;
    }

    public deleteNodeWithData(searchData: unknown): boolean {
        if (this.headNode) {
            if (this.headNode.data === searchData) return this.deleteFirstNode();
            if (this.tailNode?.data === searchData) return this.deleteLastNode();

            let currentNode = this.headNode.next;

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

    public displayList(): string {
        let displayString = '';

        if (this.headNode === null) {
            console.log('The list is empty');
            return '';
        }

        let currentNode: DoublyListNode | null = this.headNode;

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