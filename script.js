const API_URL = "http://localhost:5000";

async function createAuction() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;

    await fetch(`${API_URL}/auction`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title,
            startingPrice: price
        })
    });

    loadAuctions();
}

async function loadAuctions() {
    const res = await fetch(`${API_URL}/auctions`);
    const data = await res.json();

    const list = document.getElementById("auctionList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
        <div class="card">
            <h3>${item.title}</h3>
            <p>Current Bid: ₹${item.highestBid}</p>

            <input type="number" id="bid-${item._id}" placeholder="Enter Bid">

            <button onclick="placeBid('${item._id}')">
                Place Bid
            </button>
        </div>
        `;
    });
}

async function placeBid(id){

    const amount =
    document.getElementById(`bid-${id}`).value;

    await fetch(`${API_URL}/bid/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            bidAmount:amount
        })
    });

    loadAuctions();
}

loadAuctions();