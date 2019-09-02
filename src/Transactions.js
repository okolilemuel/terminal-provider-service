import {client} from './DB';

function saveTransaction(data) {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        const {token_address,from_address,to_address,value,transaction_hash,log_index,block_timestamp,block_number,block_hash} = data;

        let query = 'INSERT INTO transactions(token_address, from_address, to_address, value, transaction_hash, log_index, block_timestamp, block_number, block_hash) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
        const values = [token_address, from_address, to_address, value, transaction_hash, log_index, block_timestamp, block_number, block_hash];

        try {
            const result = await client.query(query, values);
            return resolve(result.rows[0].id);
        } catch (error) {
            console.error(error);
            reject(error);
        };
    });
}

function saveTransactionLabel(labels, transactionId) {
    return new Promise(async (resolve, reject) => {
        let query = `INSERT INTO labels(labels, transaction_id) VALUES($1, $2)`;
        const values = [labels, transactionId];

        try {
            const result = await client.query(query, values);
            return resolve(result.rows[0]);
        } catch (error) {
            console.error(error);
            reject(error);
        };
    });
}

export {
    saveTransaction,
    saveTransactionLabel
};