
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({limit:"10kb"}));
app.use(express.static(path.join(__dirname,"public")));

const PRODUCTS = {
  "تفعيل فوري": 2.50,
  "رتبة VIP": 5,
  "سلاح خفيف": 2.50,
  "سلاح ثقيل": 7.50,
  "مقر عصابة": 20,
  "فتح قطاع عسكري": 17
};

app.post("/api/order", async (req,res) => {
  try {
    const {product, discordUsername} = req.body || {};
    const username = String(discordUsername || "").trim();

    if (!Object.prototype.hasOwnProperty.call(PRODUCTS, product)) {
      return res.status(400).json({error:"المنتج غير موجود"});
    }

    if (username.length < 2 || username.length > 80) {
      return res.status(400).json({error:"يرجى إدخال يوزر صحيح"});
    }

    if (/[\r\n]/.test(username)) {
      return res.status(400).json({error:"اليوزر غير صالح"});
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      return res.status(503).json({error:"نظام الطلبات غير مفعّل حالياً"});
    }

    const price = PRODUCTS[product];

    const message = {
      username: "BRAVE TOWN STORE",
      embeds: [{
        title: "👑 طلب جديد | BRAVE TOWN",
        color: 0x9147FF,
        fields: [
          {name:"المنتج",value:product,inline:true},
          {name:"السعر",value:price.toFixed(2)+" ريال",inline:true},
          {name:"يوزر العميل",value:username,inline:false}
        ],
        footer:{text:"BRAVE TOWN STORE"},
        timestamp:new Date().toISOString()
      }]
    };

    const discordResponse = await fetch(webhook,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(message),
      signal:AbortSignal.timeout(10000)
    });

    if (!discordResponse.ok) {
      throw new Error("Discord notification failed");
    }

    return res.json({success:true});
  } catch(error) {
    console.error("Order error:",error.message);
    return res.status(500).json({error:"تعذر إرسال الطلب، حاول لاحقاً"});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0",()=>{
  console.log("BRAVE TOWN STORE running on port "+PORT);
});
