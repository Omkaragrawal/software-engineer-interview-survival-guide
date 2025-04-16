export class SinglyListNode {
    private nodeData: unknown;
    private nextNode: SinglyListNode | null;

    constructor(data: unknown) {
        this.nodeData = data;

        this.nextNode = null;
    }

    public get data(): unknown {
        return this.nodeData;
    }

    public get next(): SinglyListNode | null {
        return this.nextNode;
    }

    public set next(node: SinglyListNode | null) {
        this.nextNode = node ?? null;
    }
}

export class SinglyLinkedList {
    private headNode: SinglyListNode | null;
    private tailNode: SinglyListNode | null;
    public listLength = 0;

    constructor(data: unknown = null) {
        if (data === null) {
            this.headNode = null;
            this.tailNode = null;
            return;
        }

        const newNode = new SinglyListNode(data);
        this.headNode = newNode;
        this.tailNode = newNode;

        this.listLength = 1;
    }

    private setInitialNode(node: SinglyListNode) {
        this.headNode = node;
        this.tailNode = node;
    }

    public addNode(data: unknown) {
        const newNode = new SinglyListNode(data);
        this.listLength += 1;

        if (this.tailNode) {
            this.tailNode.next = newNode;
            this.tailNode = newNode;
            return;
        }

        return this.setInitialNode(newNode);
    }
    public addNodeToStart(data: unknown) {
        this.listLength += 1;
        const newNode = new SinglyListNode(data);
        if (this.headNode) {
            newNode.next = this.headNode;
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

        let element = this.headNode.next;
        for (let i = 2; i <= positionToFind; i++) {
            element = element?.next ?? null;
        }

        return element?.data || null;
    }

    public deleteFirstNode(): boolean {
        if (this.headNode) {
            const headNode = this.headNode;

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

        let currentNode = this.headNode as SinglyListNode;

        while (currentNode.next?.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = null;
        this.tailNode = currentNode;

        this.listLength -= 1;

        return false;
    }

    public deleteNodeInPosition(positionToDelete) {
        if (!this.headNode) return false;
        if (positionToDelete < 1) return false;
        if (this.listLength < positionToDelete) return false;

        if (positionToDelete === 1) {
            return this.deleteFirstNode()
        } else if (positionToDelete === this.listLength) {
            return this.deleteLastNode();
        };

        let element: SinglyListNode | null = this.headNode;
        for (let i = 2; i < positionToDelete; i++) {
            element = element?.next ?? null;

            if (element === null) break;
        }

        if (element === null) return false;

        const deletedElement = element.next;
        if (deletedElement) {
            element.next = deletedElement.next;
            deletedElement.next = null;

            if (element.next === null) this.tailNode = element;

            this.listLength = this.listLength - 1;

        } else return false;

        return true;
    }

    public deleteNodeWithData(searchData: unknown): boolean {
        if (this.headNode) {
            if (this.headNode?.data === searchData) return this.deleteFirstNode();
            if (this.tailNode?.data === searchData) return this.deleteLastNode();

            let currentNode = this.headNode.next;

            while (currentNode !== null) {
                if (currentNode.next?.data === searchData) {
                    const nodeToDelete = currentNode.next;

                    currentNode.next = nodeToDelete?.next ?? null;
                    if (currentNode.next === null) {
                        this.tailNode = currentNode;
                    }

                    (nodeToDelete as SinglyListNode).next = null;

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

        let currentNode: SinglyListNode | null = this.headNode;

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

export default SinglyLinkedList;

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