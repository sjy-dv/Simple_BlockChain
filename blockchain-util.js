const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + this.data + this.nonce
    ).toString();
  }

  mineBlock(difficulty) {}
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesis()];
  }

  createGenesis() {
    return new Block(0, `${Date.now}`, "Genesis_Block", "0");
  }
  lastestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.lastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  checkVaild() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let jsChain = new BlockChain();
let block_arr = [];

const create_block = (data) => {
  jsChain.addBlock(new Block({ data: data }, `${Date.now}`));
  block_arr.push(jsChain);
  return jsChain;
};

const blocks = () => {
  return block_arr;
};

module.exports = { create_block, blocks };
