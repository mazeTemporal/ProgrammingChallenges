/*
  important tree questions:
  binary or n-tree
  how to handle duplicates (ignore, store on right, store on left, etc)

!!! Todo:
  tree traversals
  array insert
  custom sort functions passed to constructor
  tree balancing
*/

// Binary Search Tree
class BTree {
  constructor(){
    this.root = null;
  }

  hasValue(value, tree = this.root){
    if (null === tree){
      return(false);
    } else if (value == tree.value){
      return(true);
    } else if (value < tree.value){
      return(this.hasValue(value, tree.right));
    } else {
      return(this.hasValue(value, tree.left));
    }
  }

  createNode(value){
    return({
      value: value,
      left: null,
      right: null
    });
  }

  insert(value, valueIsTree = false){
    this.root = this.insertHelper(
      valueIsTree ? value : this.createNode(value),
      this.root
    );
  }

  insertHelper(node, tree){
    if (null === tree){
      tree = node
    } else if (node.value < tree.value){
      tree.left = this.insertHelper(node, tree.left);
    } else {
      tree.right = this.insertHelper(node, tree.right);
    }
    return(tree);
  }

  remove(value){
    this.root = this.removeHelper(value, this.root);
  }

  removeHelper(value, tree){
    if (null === tree){
      return(tree);
    } else if (value == tree.value){
      // if two non-null children, combine them
      if (null !== tree.left && null !== tree.right){
        return(this.insertHelper(tree.left, tree.right));
      } else {
        // otherwise return non-null child if present
        return(null === tree.left ? tree.right : tree.left);
      }
    } else if (value < tree.value){
      tree.left = this.removeHelper(value, tree.left);
    } else {
      tree.right = this.removeHelper(value, tree.right);
    }
    return(tree);
  }
}

