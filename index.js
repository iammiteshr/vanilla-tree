let node_ui

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function highlightPath(element) {
  const path = [];
  let currentElement = element;

  // Traverse up to the root, collecting the nodes
  while (currentElement) {
    path.push(currentElement);
    currentElement = currentElement.parentElement.closest('li');
  }

  // Add the 'highlight' class to the nodes in the path
  path.forEach(node => {
    node.firstChild.classList.add('highlight');
  });
}

function createBinaryTree(array) {
  if (array.length === 0) {
    return null;
  }

  // Create the root node
  const root = new Node(array[0]);
  
  const root_ul = document.createElement('ul');
  root_ul.id = `${root.value}_ul_node`;

  const root_li = document.createElement('li');
  root_li.id = `${root.value}_node`;
  root_li.setAttribute('data-node-value',`${root.value}`);
  
  const root_div = document.createElement('div');
  root_div.textContent = root.value;
  root_div.addEventListener("click",function(){
    console.log(root,root)
  });

  root_li.appendChild(root_div);
  root_ul.appendChild(root_li);

  const output = document.getElementById('output');
  output.innerHTML = '';
  output.append(root_ul);

  // Build the binary tree recursively
  buildTree(root, array, 0, root);
  return root;
}

function buildTree(node, array, index, root) {
  // Calculate the indices of the left and right child nodes
  const leftChildIndex = 2 * index + 1;
  const rightChildIndex = 2 * index + 2;

  const parent_li = document.getElementById(`${node.value}_node`)
  const parent_ul_child = document.createElement('ul');
  parent_ul_child.id = `${node.value}_child_ul`;

  if(leftChildIndex < array.length || rightChildIndex < array.length){
    parent_li.appendChild(parent_ul_child);
  }

  // Check if the left child index is within the array bounds
  if (leftChildIndex < array.length) {
    // Create the left child node
    const leftChild = new Node(array[leftChildIndex]);
    node.left = leftChild;

    const left_li = document.createElement('li');
    left_li.id = `${leftChild.value}_node`;
    left_li.setAttribute('data-node-value',`${node.value}`);
    left_li.addEventListener("click",function(){
      highlightPath(this)
    });
    const left_div = document.createElement('div');
    left_div.textContent = leftChild.value;

    left_li.appendChild(left_div);
    parent_ul_child.appendChild(left_li);
    // Recursively build the left subtree
    buildTree(leftChild, array, leftChildIndex, root);
  }

  // Check if the right child index is within the array bounds
  if (rightChildIndex < array.length) {
    // Create the right child node
    const rightChild = new Node(array[rightChildIndex]);
    node.right = rightChild;

    const right_li = document.createElement('li');
    right_li.id = `${rightChild.value}_node`;
    right_li.setAttribute('data-node-value',`${node.value}`);
    right_li.addEventListener("click",function(){
      highlightPath(this)
    });
    const right_div = document.createElement('div');
    right_div.textContent = rightChild.value;

    right_li.appendChild(right_div);
    parent_ul_child.appendChild(right_li);
    // Recursively build the right subtree
    buildTree(rightChild, array, rightChildIndex, root);
  }
}

// Add event listener to the button
document.getElementById('submit').addEventListener('click', function() {
  //1, 2, 3, 4, 5, 6, 7, 8
  const inputArray = document.getElementById('values').value;
  const numbers = inputArray.split(',').map(Number);
  const binaryTree = createBinaryTree(numbers);
  console.log(binaryTree);

  const nodeList = [];
  preorderTraverse(binaryTree, nodeList);
  console.log(nodeList);
});