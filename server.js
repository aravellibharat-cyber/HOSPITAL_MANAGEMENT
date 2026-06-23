const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
"mongodb://127.0.0.1:27017/auctiondb"
)
.then(()=>console.log("MongoDB Connected"));

const Auction = mongoose.model(
"Auction",
new mongoose.Schema({
    title:String,
    startingPrice:Number,
    highestBid:Number
})
);

app.post("/auction", async(req,res)=>{

    const auction = new Auction({
        title:req.body.title,
        startingPrice:req.body.startingPrice,
        highestBid:req.body.startingPrice
    });

    await auction.save();

    res.json(auction);
});

app.get("/auctions", async(req,res)=>{

    const auctions =
    await Auction.find();

    res.json(auctions);
});

app.put("/bid/:id", async(req,res)=>{

    const auction =
    await Auction.findById(req.params.id);

    if(
        req.body.bidAmount >
        auction.highestBid
    ){
        auction.highestBid =
        req.body.bidAmount;

        await auction.save();

        res.json({
            message:"Bid Accepted"
        });
    }
    else{
        res.json({
            message:"Bid too low"
        });
    }
});
app.get('/', (req, res) => {
    res.send('Backend server is running smoothly!');
});
app.listen(5000,()=>{
    console.log(
    "Server Running On Port 5000"
    );
});