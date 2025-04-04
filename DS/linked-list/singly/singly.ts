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
    private listLength = 0;

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

        if (positionToFind === 1) return this.headNode;

        let element = this.headNode.next;
        for (let i = 2; i <= positionToFind; i++) {
            element = element?.next || null;
        }

        return element?.data || null;
    }

    /**
     * implement getNodeInPosition
     * 1. It will take in input parameter of position (which will be 1 more than the index)
     * 2. if 1, then display the first node
     * 3. Iterate through the nodes starting at 0 till the count is position - 1
     * 4. Then display the current data
     * 5. If current.next is null before reaching position - 1, then display index out of bounds error
     */

    public deleteFirstNode(): boolean {
        if (this.headNode) {
            const headNode = this.headNode;

            this.headNode = headNode.next;
            headNode.next = null;

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

        this.listLength -= 1;

        return false;
    }

    public deleteNodeInPosition(positionToDelete: number): boolean {
        if (!this.headNode) return false;
        if (positionToDelete < 1) return false;
        if (this.listLength < positionToDelete) return false;

        if (positionToDelete === 1) {
            const currElement = this.headNode;

            this.headNode = currElement.next;
            currElement.next = null;

            this.listLength = this.listLength - 1;

            return true
        };

        let element: SinglyListNode | null = this.headNode;
        for (let i = 2; i < positionToDelete; i++) {
            element = element?.next || null;

            if (element === null) break;
        }

        if (element === null) return false;

        const deletedElement = element.next;
        if (deletedElement) {
            element.next = deletedElement.next;
            deletedElement.next = null;

            this.listLength = this.listLength - 1;

        } else return false;

        return true;
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

                    this.listLength -= 1;

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