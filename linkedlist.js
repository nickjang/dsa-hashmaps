class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      while (currNode.next !== null)
        currNode = currNode.next;
      currNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, key) {
    let prevNode;
    let currNode;

    if (this.head.value === key) {
      this.insertFirst(item);
    } else {
      prevNode = this.head;
      currNode = this.head.next;
      while (currNode) {
        if (currNode.value === key) {
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        } else {
          prevNode = currNode;
          currNode = currNode.next;
        }
      }
    }
  }

  insertAfter(item, key) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === key) {
        const node = new _Node(item, currNode.next);
        currNode.next = node;
        return;
      } else {
        currNode = currNode.next;
      }
    }
  }

  insertAt(item, position) {
    let prevNode;
    let currNode;

    if (position === 0) {
      this.insertFirst(item);
    } else {
      prevNode = this.head;
      currNode = this.head.next;
      let idx = 1;
      while (currNode) {
        if (idx === position) {
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        }
        prevNode = currNode;
        currNode = currNode.next;
        idx++;
      }
    }
  }

  find(item) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === item) return currNode;
      currNode = currNode.next;
    }
    return null;
  }

  remove(item) {
    if (!this.head) {
      return;
    } else if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let prevNode;
    let currNode = this.head;

    while (currNode) {
      if (currNode.value === item) {
        prevNode.next = currNode.next;
        currNode = currNode.next;
        if (!currNode) return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;