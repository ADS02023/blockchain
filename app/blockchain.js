//importamos las librerias
const sha256 = require('js-sha256');

class BlockChain {
    constructor() {
        // Constructor de la clase BlockChain
        this.difficulty = 2; // Nivel de dificultad para la minería de bloques
        this.chain = [this.createGenesisBlock()]; // Inicializa la cadena de bloques con el bloque génesis
    }

    createGenesisBlock() {
        // Crea y devuelve un nuevo objeto de tipo Block que representa el bloque génesis
        return new Block('', 'genesis block', new Date(), this.difficulty);
    }

    addNewBlock(transactions) {
        // Crea un nuevo bloque utilizando la información proporcionada y la cadena actual
        const newBlock = new Block(this.chain[this.chain.length - 1].hash, transactions, new Date(), this.difficulty);
        // Agrega el nuevo bloque a la cadena de bloques
        this.chain.push(newBlock);
    } 

    validateBlock(block) {
        // Calcula el hash del bloque utilizando la información del bloque
        const hash = sha256(`${block.nonce}${block.previousBlock}${block.transactions}`);
        
        // Compara el hash calculado con el hash almacenado en el bloque
        if (block.hash === hash) {
          console.log('valid block'); // Si los hashes coinciden, se considera un bloque válido
        } else {
          console.log('TEMPERED BLOCK'); // Si los hashes no coinciden, se considera un bloque alterado
        }
    }
      
}
  

class Block {
    // Constructor de la clase Block que recibe varios parámetros al crear una instancia de un bloque
    constructor(previuosBlock, transactions, timeSamp, difficulty) {
        this.difficulty = difficulty; // Dificultad de minería del bloque
        this.hash = ''; // Hash del bloque
        this.timeSamp = timeSamp; // Marca de tiempo del bloque
        this.previuosBlock = previuosBlock; // Hash del bloque anterior en la cadena
        this.transactions = transactions; // Transacciones incluidas en el bloque
        this.nonce = this.createNonce(); // Valor nonce calculado para cumplir con la dificultad
    }//fin del constructor  

    createNonce() {
        // Método para calcular el nonce que cumple con la dificultad
        let nonce = 0; // Inicializa el nonce a 0
        const targetZeros = ('0').repeat(this.difficulty); // Crea una cadena de '0's con la longitud de la dificultad
        while (true) {
            const hash = sha256(`${nonce}${this.previousBlock}${this.transactions}`);
            // Calcula el hash concatenando el nonce, el hash del bloque anterior y las transacciones
            if (hash.startsWith(targetZeros)) {
                this.hash = hash; // Establece el hash del bloque cuando se encuentra uno válido
                break; // Sale del bucle una vez que se encuentra un hash válido
            }
            nonce++; // Incrementa el nonce para intentar nuevamente
        }
        return nonce; // Devuelve el nonce calculado
    }//fin de la funcion createNonce
}//fin de la clase Block

const blockChain = new BlockChain();
blockChain.addNewBlock('nuevas transacciones')
console.log(blockChain)




