export class SinglyListNode {
    private nodeData: unknown;
    private nextNode!: SinglyListNode | null;

    constructor(data: unknown) {
        this.nodeData = data;
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

    constructor(data: unknown = null) {
        if (data === null) {
            this.headNode = null;
            this.tailNode = null;
            return;
        }

        const newNode = new SinglyListNode(data);
        this.headNode = newNode;
        this.tailNode = newNode;
    }

    private setInitialNode(node: SinglyListNode) {
        this.headNode = node;
        this.tailNode = node;
    }

    public addNode(data: unknown) {
        const newNode = new SinglyListNode(data);
        if (this.tailNode) {
            this.tailNode.next = newNode;
            this.tailNode = newNode;
            return;
        }

        return this.setInitialNode(newNode);
    }
    public addNodeToStart(data: unknown) {
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

    /**
     * implement getNodeInPosition
     * 1. It will take in input parameter of position (which will be 1 more than the index)
     * 2. if 1, then display the first node
     * 3. Iterate through the nodes starting at 0 till the count is position - 1
     * 4. Then display the current data
     * 5. If current.next is null then display index out of bounds error
     */

    public deleteFirstNode(): boolean {
        if (this.headNode) {
            const headNode = this.headNode;

            this.headNode = headNode.next;
            headNode.next = null;

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

        return false;
    }

    /**
     * implement deleteNodeInPosition
     * 1. It will take in input parameter of position (which will be 1 more than the index)
     * 2. if 1, then delete the first node
     * 3. If 2, then set headNode to next.next
     * 4. Iterate through the nodes starting at 0 till the count is position - 2
     * 5. Save the currentNode.next in nodeToDelete variable
     * 6. Set currentNode.next = currentNode.next.next
     * 7. Set nodeToDelete.next to null, to avoid situations where if this node is cached then it gives access to further nodes
     */

    public deleteNodeWithData(searchData: unknown): boolean {
        if (this.headNode) {
            if (this.headNode.data === searchData) {
                return this.deleteFirstNode();
            }

            let currentNode = this.headNode.next;

            while (currentNode !== null) {
                if (currentNode.data === searchData) {
                    const nodeToDelete = currentNode;

                    currentNode = nodeToDelete.next;
                    nodeToDelete.next = null;

                    return true;
                }

                currentNode = currentNode.next;
            }
        }

        return false;
    }

    public displayList(): void {
        let displayString = '';

        if (this.headNode === null) {
            console.log('The list is empty');
            return;
        }

        let currentNode: SinglyListNode | null = this.headNode;

        while (currentNode !== null) {
            displayString += currentNode.data;
            currentNode = currentNode.next;

            if (currentNode !== null) {
                displayString += '-->'
            }
        }
    }
}