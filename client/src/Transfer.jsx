import { useState } from "react";
import server from "./server";
import { hashMessage } from "./services";

function Transfer({address, setBalance}){
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const setValue = (setter) => (evt) =>  setter(evt.target.value);

    async function getSignature(evt){
        evt.preventDefault();

        try{
            let data = {
                recipient,
                amount: parseInt(sendAmount)
            }
            let msgHex = await hashMessage(JSON.stringify(data));
            let signature = prompt(`Sign message (${msgHex}) and provide signature:`)
            if(signature == null){
                alert("You did not provide a signature")
                return;
            }
            await Transfer(signature);
        } catch (ex){
            alert(ex.response.data.message);
        }

    }

async function transfer(signature){
    const {
        data: {balance}
    } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature
    });
    setBalance(balance);
    alert("Funds transferred successfully!")
}

return (
    <form className="container transfer" onSubmit={getSignature}>
        <h1>Send Transaction</h1>
        <label>
            Send Amount 
            <input placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}/>
        </label>
        <label>
            Recipient
            <input placeholder="Type an address, For example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}/>
        </label>

        <input type="submit" className="button" value="Transfer" />
    </form>
);
}

export default Transfer;