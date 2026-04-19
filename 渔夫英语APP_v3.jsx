import { useState, useEffect, useRef } from "react";

// ─── DEFAULT VOCAB ───────────────────────────────────────────────────────────
const DEFAULT_RAW = [
  [1,"Bullish","BOO-lish","看涨的，乐观的","加密货币","I'm bullish on BTC this cycle.","我对这轮BTC周期持看涨态度。"],
  [2,"Bearish","BEAR-ish","看跌的，悲观的","加密货币","The market looks bearish after the rejection.","受阻后市场看起来处于看跌状态。"],
  [3,"Long","long","做多","加密货币","I went long BTC at $82k.","我在8.2万做多了BTC。"],
  [4,"Short","short","做空","加密货币","Shorting here with a tight stop.","在这里做空，止损很紧。"],
  [5,"Entry","EN-tree","入场价，进场","加密货币","My entry was at $80,000.","我的入场价是8万美元。"],
  [6,"Target","TAR-get","目标价","加密货币","Target is $90k if we break out.","如果突破，目标价是9万。"],
  [7,"Stop loss","stop loss","止损","加密货币","Set your stop loss at $78k.","把止损设在7.8万。"],
  [8,"Take profit","take PRO-fit","止盈","加密货币","I'm taking profit at resistance.","我在阻力位止盈。"],
  [9,"Leverage","LEV-er-ij","杠杆","加密货币","Using 10x leverage is very risky.","使用10倍杠杆风险很大。"],
  [10,"Liquidated","LIK-wih-day-tid","爆仓，被清算","加密货币","He got liquidated at $79k.","他在7.9万被爆仓了。"],
  [11,"Breakout","BRAYK-owt","突破","加密货币","Waiting for a confirmed breakout above $88k.","等待8.8万上方的确认突破。"],
  [12,"Breakdown","BRAYK-down","跌破","加密货币","A breakdown below support is bearish.","跌破支撑位是看跌信号。"],
  [13,"Support","suh-PORT","支撑位","加密货币","$80k is a key support level.","8万美元是关键支撑位。"],
  [14,"Resistance","rih-ZIS-tunce","阻力位","加密货币","$90k is strong resistance.","9万是强阻力位。"],
  [15,"Consolidation","kun-sol-ih-DAY-shun","盘整","加密货币","Price is in consolidation between $80k and $85k.","价格在8万到8.5万之间盘整。"],
  [16,"Rally","RAL-ee","反弹，上涨行情","加密货币","We saw a strong rally to $88k.","我们看到了一波强力反弹至8.8万。"],
  [17,"Dump","dump","暴跌","加密货币","The market dumped 10% overnight.","市场一夜之间暴跌了10%。"],
  [18,"Pump","pump","暴涨","加密货币","BTC pumped to a new ATH.","BTC暴涨至新的历史高点。"],
  [19,"Dip","dip","短暂下跌，回调","加密货币","Buy the dip if support holds.","如果支撑位守住就买入回调。"],
  [20,"Correction","kuh-REK-shun","回调，修正","加密货币","A 20% correction is healthy in a bull run.","牛市中20%的回调是健康的。"],
  [21,"Retest","REE-test","回测","加密货币","Price is retesting the breakout level.","价格在回测突破点位。"],
  [22,"Bounce","bownce","反弹","加密货币","We need a bounce from support.","我们需要从支撑位反弹。"],
  [23,"Rejection","rih-JEK-shun","受阻，拒绝突破","加密货币","There was a clear rejection at $90k.","在9万处有明显受阻。"],
  [24,"Uptrend","UP-trend","上升趋势","加密货币","BTC is still in an uptrend on the daily chart.","BTC在日线图上仍处于上升趋势。"],
  [25,"Downtrend","DOWN-trend","下降趋势","加密货币","We've been in a downtrend for 3 months.","我们已经处于下降趋势3个月了。"],
  [26,"Sideways","SIDE-wayz","横盘","加密货币","Price is moving sideways, waiting for a catalyst.","价格横盘等待催化剂。"],
  [27,"Accumulation","ah-kyoom-yuh-LAY-shun","积累阶段，吸筹","加密货币","Smart money is in accumulation mode.","聪明钱正处于吸筹阶段。"],
  [28,"Distribution","dis-trih-BYOO-shun","出货，分配阶段","加密货币","Signs of distribution near the top.","顶部附近出现出货迹象。"],
  [29,"Overbought","OH-ver-bawt","超买","加密货币","RSI is overbought above 70.","RSI超过70进入超买区间。"],
  [30,"Oversold","OH-ver-sohld","超卖","加密货币","Price looks oversold on the 4H.","价格在4小时图上看起来超卖了。"],
  [31,"Momentum","moh-MEN-tum","动能","加密货币","Bullish momentum is building.","看涨动能正在积聚。"],
  [32,"Volume","VOL-yoom","成交量","加密货币","High volume confirms the breakout.","高成交量确认了突破。"],
  [33,"Volatility","vol-uh-TIL-ih-tee","波动率","加密货币","Volatility is very high during news events.","新闻事件期间波动率非常高。"],
  [34,"Liquidity","lih-KWID-ih-tee","流动性","加密货币","There is a liquidity zone below at $78k.","7.8万下方有一个流动性区间。"],
  [35,"Position","puh-ZI-shun","仓位，头寸","加密货币","I'm reducing my position at these levels.","在这些价位我在减少仓位。"],
  [36,"Portfolio","port-FOH-lee-oh","投资组合","加密货币","My portfolio is up 30% this month.","我的投资组合本月上涨了30%。"],
  [37,"Margin","MAR-jin","保证金","加密货币","Adding more margin to avoid liquidation.","增加保证金以避免爆仓。"],
  [38,"Funding rate","FUN-ding rayt","资金费率","加密货币","Funding rate is positive, longs paying shorts.","资金费率为正，多头给空头付费。"],
  [39,"Open interest","OH-pen IN-trest","未平仓合约量","加密货币","Rising open interest with price is bullish.","未平仓量随价格上升，看涨信号。"],
  [40,"Candle","KAN-dul","K线蜡烛图","加密货币","That's a strong bullish candle.","那是一根强势看涨的K线。"],
  [41,"Wick","wik","影线","加密货币","Long wick shows strong rejection.","长影线显示了强烈的受阻。"],
  [42,"Moving average","MOO-ving AV-er-ij","均线","加密货币","Price is above the 200-day moving average.","价格在200日均线上方。"],
  [43,"RSI","ar-es-eye","相对强弱指数","加密货币","RSI is showing bullish divergence.","RSI显示看涨背离。"],
  [44,"MACD","em-ay-see-dee","MACD指标","加密货币","MACD crossed bullish on the daily.","MACD在日线上形成看涨交叉。"],
  [45,"Fibonacci","fib-oh-NAH-chee","斐波那契","加密货币","The 0.618 Fibonacci level held as support.","0.618斐波那契位守住了支撑。"],
  [46,"Trend line","TREND line","趋势线","加密货币","A break above the trend line is bullish.","突破趋势线是看涨信号。"],
  [47,"Higher high","HY-er hy","更高高点","加密货币","We made a higher high, trend is intact.","我们创了更高高点，趋势完好。"],
  [48,"Higher low","HY-er loh","更高低点","加密货币","A higher low confirms the uptrend.","更高低点确认了上升趋势。"],
  [49,"Lower low","LOH-er loh","更低低点","加密货币","A lower low means the downtrend continues.","更低低点意味着下降趋势持续。"],
  [50,"Lower high","LOH-er hy","更低高点","加密货币","Lower highs tell us sellers are in control.","更低高点告诉我们卖家占主导。"],
  [51,"Wallet","WAH-lit","钱包","加密货币","Always use a hardware wallet for large amounts.","大额资金始终使用硬件钱包。"],
  [52,"Address","AD-res","钱包地址","加密货币","Send funds to this wallet address.","把资金发送到这个钱包地址。"],
  [53,"Transaction","tran-ZAK-shun","交易","加密货币","The transaction is confirmed on-chain.","交易已在链上确认。"],
  [54,"Blockchain","BLOK-chayn","区块链","加密货币","All transactions are recorded on the blockchain.","所有交易都记录在区块链上。"],
  [55,"Gas fee","gas fee","燃气费","加密货币","Gas fees are very high during congestion.","网络拥堵时燃气费非常高。"],
  [56,"Smart contract","smart KON-trakt","智能合约","加密货币","The smart contract automatically executes the trade.","智能合约自动执行了交易。"],
  [57,"Protocol","PROH-tuh-kol","协议","加密货币","This DeFi protocol has $2B in TVL.","这个DeFi协议有20亿美元的锁仓量。"],
  [58,"DeFi","DEE-fy","去中心化金融","加密货币","DeFi allows you to earn yield without a bank.","DeFi让你无需银行即可赚取收益。"],
  [59,"DEX","deks","去中心化交易所","加密货币","Uniswap is the largest DEX by volume.","Uniswap是成交量最大的去中心化交易所。"],
  [60,"CEX","seks","中心化交易所","加密货币","Binance is the largest CEX in the world.","币安是全球最大的中心化交易所。"],
  [61,"Staking","STAY-king","质押","加密货币","You can earn 5% APY by staking ETH.","质押ETH可以赚取5%的年化收益。"],
  [62,"Airdrop","AIR-drop","空投","加密货币","Early users received an airdrop of 1000 tokens.","早期用户收到了1000个代币的空投。"],
  [63,"Whitelist","WYT-list","白名单","加密货币","Only whitelisted wallets can participate.","只有白名单钱包才能参与。"],
  [64,"Mint","mint","铸造","加密货币","You can mint the NFT for 0.05 ETH.","你可以用0.05 ETH铸造这个NFT。"],
  [65,"Burn","burn","销毁","加密货币","50% of transaction fees are burned.","50%的交易费用被销毁。"],
  [66,"Whale","wayl","巨鲸，大户","加密货币","A whale just moved 1,000 BTC.","一条巨鲸刚刚转移了1000个BTC。"],
  [67,"Bridge","brij","跨链桥","加密货币","Use the bridge to move funds to Arbitrum.","使用跨链桥将资金转移到Arbitrum。"],
  [68,"Swap","swop","兑换","加密货币","I swapped ETH for USDC on Uniswap.","我在Uniswap上把ETH兑换成了USDC。"],
  [69,"TVL","tee-vee-el","总锁仓量","加密货币","The protocol's TVL dropped 30% after the hack.","黑客攻击后协议锁仓量下降了30%。"],
  [70,"APY","ay-pee-wy","年化收益率","加密货币","This pool offers 12% APY.","这个池子提供12%的年化收益率。"],
  [71,"Slippage","SLIP-ij","滑点","加密货币","Set slippage to 1% for large trades.","大额交易将滑点设为1%。"],
  [72,"Layer 1","LAY-er wun","第一层网络","加密货币","Ethereum is a Layer 1 blockchain.","以太坊是第一层区块链。"],
  [73,"Layer 2","LAY-er too","第二层网络","加密货币","Arbitrum is a Layer 2 built on Ethereum.","Arbitrum是建立在以太坊上的第二层网络。"],
  [74,"Mainnet","MAYN-net","主网","加密货币","The project launches on mainnet next week.","该项目下周在主网上线。"],
  [75,"Halving","HAV-ing","减半","加密货币","Bitcoin halving happens every 4 years.","比特币减半每4年发生一次。"],
  [76,"Cold wallet","kohld WAH-lit","冷钱包","加密货币","Store your long-term holdings in a cold wallet.","把长期持仓存储在冷钱包中。"],
  [77,"Seed phrase","seed frayz","助记词","加密货币","Never share your seed phrase with anyone.","永远不要与任何人分享你的助记词。"],
  [78,"Private key","PRY-vit kee","私钥","加密货币","Your private key gives full access to your wallet.","你的私钥可以完全访问你的钱包。"],
  [79,"Spot market","spot MAR-kit","现货市场","加密货币","I bought BTC on the spot market, no leverage.","我在现货市场买了BTC，没有杠杆。"],
  [80,"Perpetual","per-PECH-oo-ul","永续合约","加密货币","Trading perpetuals with 5x leverage.","以5倍杠杆交易永续合约。"],
  [81,"HODL","HOD-ul","持有不卖","加密货币","HODL through the volatility.","在波动中坚定持有。"],
  [82,"DYOR","dee-yor","自己做研究","加密货币","NFA, DYOR before you invest.","不构成投资建议，投资前自己做研究。"],
  [83,"FOMO","FOH-moh","害怕错过","加密货币","Don't FOMO buy at the top.","不要在顶部因恐惧错过而冲入。"],
  [84,"FUD","fud","恐惧不确定怀疑","加密货币","Ignore the FUD and focus on fundamentals.","忽略FUD，专注于基本面。"],
  [85,"Rekt","rekt","亏惨了，爆仓","加密货币","Got rekt by the 20% crash.","被20%的崩跌搞惨了。"],
  [86,"Diamond hands","DY-mund handz","钻石手（坚持持有）","加密货币","Diamond hands, not selling until $200k.","钻石手，不到20万不卖。"],
  [87,"Paper hands","PAY-per handz","纸手（容易割肉）","加密货币","Paper hands sold at the bottom again.","纸手又在底部割肉了。"],
  [88,"Moon","moon","暴涨，飞涨","加密货币","This token is about to moon.","这个代币即将暴涨。"],
  [89,"WAGMI","WAG-mee","我们都会成功","加密货币","Stay strong, WAGMI.","保持坚强，我们都会成功的。"],
  [90,"NGMI","en-jee-em-eye","不会成功","加密货币","Selling here? NGMI.","在这里卖？你是不会成功的。"],
  [91,"Alpha","AL-fuh","内幕消息，先机","加密货币","I have some alpha on the next big project.","我有下一个大项目的内部消息。"],
  [92,"Degen","DEE-jen","极端冒险的投机者","加密货币","He's a full degen, always aping into risky plays.","他是个纯粹的冒险者。"],
  [93,"Shill","shil","鼓吹，推销","加密货币","He's just shilling his bags.","他只是在鼓吹自己持有的币。"],
  [94,"Rugged","RUG-id","被跑路骗了","加密货币","The dev rugged the project and took all the funds.","开发者卷走所有资金跑路了。"],
  [95,"ATH","ay-tee-aych","历史最高价","加密货币","BTC just hit a new ATH.","BTC刚刚创下历史新高。"],
  [96,"ATL","ay-tee-el","历史最低价","加密货币","This altcoin is trading near its ATL.","这个山寨币的交易价格接近历史最低点。"],
  [97,"Altcoin","AWL-koyn","山寨币","加密货币","Altcoin season is when alts outperform BTC.","山寨季是指山寨币跑赢BTC的时期。"],
  [98,"Memecoin","MEEM-koyn","迷因币","加密货币","Memecoins are pure speculation.","迷因币纯粹是投机。"],
  [99,"Narrative","NAR-uh-tiv","叙事，市场主题","加密货币","The AI narrative is driving this sector.","AI叙事正在推动这个板块。"],
  [100,"NFA","en-ef-ay","不构成投资建议","加密货币","NFA - do your own research.","不构成投资建议，请自行研究。"],
  [101,"Pump and dump","pump and dump","拉高出货","加密货币","Avoid low-cap coins, easy to pump and dump.","避开低市值币，容易被拉高出货。"],
  [102,"Rugpull","RUG-pul","跑路骗局","加密货币","Always check if it's a rugpull risk.","始终检查是否存在跑路风险。"],
  [103,"Bull run","bool run","牛市行情","加密货币","The next bull run could push BTC to $200k.","下一轮牛市行情可能将BTC推至20万。"],
  [104,"Bear market","BEAR MAR-kit","熊市","加密货币","We survived the 2022 bear market.","我们熬过了2022年的熊市。"],
  [105,"LFG","el-ef-jee","冲啊！","加密货币","BTC breaking ATH, LFG!","BTC突破历史高点，冲啊！"],
  [106,"GM","jee-em","早安","加密货币","GM everyone, exciting day ahead.","大家早安，前方是令人兴奋的一天。"],
  [107,"Bluechip","BLOO-chip","蓝筹（高质量项目）","加密货币","BTC and ETH are the bluechip crypto assets.","BTC和ETH是蓝筹加密资产。"],
  [108,"Exit liquidity","EK-sit lih-KWID-ih-tee","接盘侠","加密货币","Retail are just exit liquidity for the whales.","散户只是巨鲸的接盘侠。"],
  [109,"KYC","kay-wy-see","实名认证","加密货币","Most CEX require KYC to withdraw large amounts.","大多数交易所要求大额提款做KYC。"],
  [110,"Derivatives","dih-RIV-uh-tivz","衍生品","加密货币","The derivatives market is much larger than spot.","衍生品市场比现货市场大得多。"],
  [111,"Revenue","REV-uh-nyoo","营收","股票金融","Apple's revenue beat expectations by 5%.","苹果的营收超出预期5%。"],
  [112,"Earnings","ER-ningz","盈利，财报","股票金融","Earnings season starts next week.","财报季下周开始。"],
  [113,"EPS","ee-pee-es","每股收益","股票金融","EPS came in at $2.50, above estimates.","每股收益为2.50美元，高于预期。"],
  [114,"Guidance","GY-dunce","业绩指引","股票金融","The company raised full-year guidance.","公司上调了全年业绩指引。"],
  [115,"Forecast","FOR-kast","预测","股票金融","Analysts forecast 15% revenue growth.","分析师预测营收增长15%。"],
  [116,"Beat","beet","超预期","股票金融","The stock surged 8% after beating estimates.","股票在超出预期后上涨了8%。"],
  [117,"Miss","mis","低于预期","股票金融","A miss on revenue sent the stock down 12%.","营收不及预期导致股票下跌12%。"],
  [118,"Outlook","OWT-look","前景展望","股票金融","The company gave a cautious outlook for Q3.","公司对第三季度给出了谨慎的展望。"],
  [119,"Gross margin","grohs MAR-jin","毛利率","股票金融","Gross margin expanded to 45% this quarter.","本季度毛利率扩大至45%。"],
  [120,"Net income","net IN-kum","净利润","股票金融","Net income doubled year-over-year.","净利润同比翻倍。"],
  [121,"EBITDA","ee-BIT-duh","息税折旧及摊销前利润","股票金融","EBITDA margin is a key profitability metric.","EBITDA利润率是关键的盈利指标。"],
  [122,"Cash flow","kash floh","现金流","股票金融","Strong cash flow supports future growth.","强劲的现金流支持未来增长。"],
  [123,"Free cash flow","free kash floh","自由现金流","股票金融","FCF is better than reported earnings.","自由现金流比报告的盈利更好。"],
  [124,"Dividend","DIV-ih-dend","股息","股票金融","The company raised its quarterly dividend by 10%.","公司将季度股息提高了10%。"],
  [125,"Buyback","BY-bak","股票回购","股票金融","A $50B buyback program was announced.","宣布了500亿美元的股票回购计划。"],
  [126,"Market cap","MAR-kit kap","市值","股票金融","Apple's market cap exceeds $3 trillion.","苹果的市值超过3万亿美元。"],
  [127,"P/E ratio","pee-ee RAY-shee-oh","市盈率","股票金融","A P/E of 30x is expensive for this sector.","30倍市盈率对这个行业来说很贵。"],
  [128,"Valuation","val-yoo-AY-shun","估值","股票金融","The valuation looks stretched at current levels.","目前价位的估值看起来偏高。"],
  [129,"Overvalued","oh-ver-VAL-yood","高估","股票金融","Tech stocks are overvalued right now.","科技股目前被高估了。"],
  [130,"Undervalued","un-der-VAL-yood","低估","股票金融","This stock is deeply undervalued.","这只股票被严重低估了。"],
  [131,"IPO","eye-pee-oh","首次公开募股","股票金融","The company IPO'd at $50 per share.","该公司以每股50美元的价格上市。"],
  [132,"ETF","ee-tee-ef","交易所交易基金","股票金融","BTC ETF approval drove massive inflows.","BTC ETF获批推动了大量资金流入。"],
  [133,"Short squeeze","short skweez","逼空","股票金融","GME had an epic short squeeze in 2021.","GME在2021年经历了一次史诗级逼空。"],
  [134,"Options","OP-shunz","期权","股票金融","Options expire this Friday.","期权本周五到期。"],
  [135,"Puts","puts","看跌期权","股票金融","Buying puts to hedge my long position.","购买看跌期权对冲我的多头仓位。"],
  [136,"Calls","kawlz","看涨期权","股票金融","These calls expire worthless if price doesn't move.","如果价格不动，这些看涨期权将归零。"],
  [137,"Implied volatility","im-PLYD vol-uh-TIL-ih-tee","隐含波动率","股票金融","IV is very high before earnings.","财报前隐含波动率很高。"],
  [138,"Futures","FYOO-cherz","期货","股票金融","Oil futures dropped sharply overnight.","石油期货昨夜急剧下跌。"],
  [139,"Upgrade","UP-grayd","上调评级","股票金融","Goldman upgraded the stock to Buy.","高盛将该股票上调至买入评级。"],
  [140,"Downgrade","DOWN-grayd","下调评级","股票金融","Morgan Stanley downgraded TSLA to Sell.","摩根士丹利将特斯拉下调至卖出评级。"],
  [141,"Price target","prys TAR-get","目标价","股票金融","New price target is $250 per share.","新的目标价是每股250美元。"],
  [142,"Overweight","oh-ver-WAYT","超配","股票金融","JPMorgan is overweight on tech stocks.","摩根大通对科技股超配。"],
  [143,"Underweight","un-der-WAYT","低配","股票金融","We're underweight on energy this quarter.","本季度我们对能源板块低配。"],
  [144,"Neutral","NOO-trul","中性评级","股票金融","The analyst maintained a neutral rating.","分析师维持了中性评级。"],
  [145,"Catalyst","KAT-uh-list","催化剂","股票金融","Earnings could be the catalyst for a big move.","财报可能成为大幅波动的催化剂。"],
  [146,"Headwind","HED-wind","不利因素","股票金融","Rising rates are a headwind for growth stocks.","利率上升对成长股来说是不利因素。"],
  [147,"Tailwind","TAYL-wind","有利因素","股票金融","AI adoption is a tailwind for semiconductor stocks.","AI的普及是半导体股票的有利因素。"],
  [148,"Risk-off","risk off","避险情绪","股票金融","Risk-off sentiment is hitting markets.","避险情绪正在冲击市场。"],
  [149,"Risk-on","risk on","风险偏好情绪","股票金融","Risk-on mode means buying equities.","风险偏好模式意味着买入股票。"],
  [150,"Sentiment","SEN-tih-ment","市场情绪","股票金融","Market sentiment has turned very negative.","市场情绪已经变得非常负面。"],
  [151,"Drawdown","DRAW-down","回撤","股票金融","The portfolio experienced a 15% drawdown.","投资组合经历了15%的回撤。"],
  [152,"Due diligence","dyoo DIL-ih-junce","尽职调查","股票金融","Always do due diligence before investing.","投资前始终要做尽职调查。"],
  [153,"Sector rotation","SEK-ter roh-TAY-shun","板块轮动","股票金融","There's a sector rotation into defensive stocks.","资金正在轮动到防御性股票。"],
  [154,"Hedge","hej","对冲","股票金融","Use gold to hedge against inflation.","用黄金对冲通胀风险。"],
  [155,"Institutional","in-stih-TOO-shun-ul","机构","股票金融","Institutional buying is pushing the stock higher.","机构买入正在推高股价。"],
  [156,"Retail investor","REE-tayl in-VES-ter","散户投资者","股票金融","Retail investors piled into the stock.","散户投资者大量涌入该股票。"],
  [157,"Short interest","short IN-trest","做空比例","股票金融","High short interest can fuel a short squeeze.","高做空比例可能引发逼空。"],
  [158,"Pre-market","pree-MAR-kit","盘前交易","股票金融","The stock is up 5% in pre-market trading.","该股票在盘前交易中上涨了5%。"],
  [159,"After-hours","AF-ter owrz","盘后交易","股票金融","Earnings were released after-hours.","财报在盘后公布。"],
  [160,"Circuit breaker","SER-kit BRAYK-er","熔断机制","股票金融","A circuit breaker halted trading for 15 minutes.","熔断机制暂停了15分钟的交易。"],
  [161,"Federal Reserve","FED-er-ul rih-ZERV","美联储","金融政策","The Federal Reserve raised rates by 25 basis points.","美联储加息25个基点。"],
  [162,"Interest rate","IN-trest rayt","利率","金融政策","Lower interest rates boost the stock market.","较低的利率推动股市上涨。"],
  [163,"Rate hike","rayt hyk","加息","金融政策","A surprise rate hike shocked markets.","意外加息令市场震惊。"],
  [164,"Rate cut","rayt kut","降息","金融政策","Rate cuts are expected in September.","预计9月将降息。"],
  [165,"Inflation","in-FLAY-shun","通货膨胀","金融政策","Inflation hit 4% last month.","上个月通货膨胀率达到4%。"],
  [166,"Deflation","dee-FLAY-shun","通货紧缩","金融政策","Deflation is dangerous for economic growth.","通货紧缩对经济增长是危险的。"],
  [167,"CPI","see-pee-eye","消费者价格指数","金融政策","CPI data releases tomorrow at 8:30am.","CPI数据明天早上8点30分公布。"],
  [168,"Core inflation","kor in-FLAY-shun","核心通胀","金融政策","Core inflation strips out food and energy.","核心通胀剔除了食品和能源。"],
  [169,"Non-farm payrolls","non-farm PAY-rohlz","非农就业数据","金融政策","Non-farm payrolls came in much stronger than expected.","非农就业数据远强于预期。"],
  [170,"GDP","jee-dee-pee","国内生产总值","金融政策","GDP grew 2.5% in Q2.","第二季度GDP增长了2.5%。"],
  [171,"Quantitative easing","KWON-tih-tay-tiv EE-zing","量化宽松（QE）","金融政策","QE involves the Fed buying bonds.","量化宽松涉及美联储购买债券。"],
  [172,"Quantitative tightening","KWON-tih-tay-tiv TY-ten-ing","量化紧缩（QT）","金融政策","QT reduces money supply and hurts markets.","量化紧缩减少货币供应，伤害市场。"],
  [173,"Tapering","TAY-per-ing","缩减购债","金融政策","The Fed began tapering asset purchases.","美联储开始缩减资产购买。"],
  [174,"Pivot","PIV-ut","政策转向","金融政策","Markets are waiting for the Fed pivot to cuts.","市场在等待美联储转向降息。"],
  [175,"Dovish","DUV-ish","鸽派（倾向宽松降息）","金融政策","Dovish comments from the Fed boosted stocks.","美联储鸽派言论提振了股市。"],
  [176,"Hawkish","HAW-kish","鹰派（倾向紧缩加息）","金融政策","Hawkish tone from Powell crushed the rally.","鲍威尔的鹰派态度打压了反弹。"],
  [177,"Yield curve","yeeld kerv","收益率曲线","金融政策","An inverted yield curve predicts recession.","倒置的收益率曲线预示着衰退。"],
  [178,"Treasury","TREZH-uh-ree","国债，财政部","金融政策","10-year Treasury yield hit 5%.","10年期国债收益率达到5%。"],
  [179,"Bond","bond","债券","金融政策","Rising bond yields hurt tech stocks.","债券收益率上升伤害科技股。"],
  [180,"Basis point","BAY-sis poynt","基点（0.01%）","金融政策","The Fed cut rates by 50 basis points.","美联储降息50个基点。"],
  [181,"FOMC","ef-oh-em-see","联邦公开市场委员会","金融政策","The FOMC meets 8 times per year.","联邦公开市场委员会每年开会8次。"],
  [182,"Recession","rih-SESH-un","经济衰退","金融政策","Two consecutive quarters of negative GDP is a recession.","连续两个季度负增长为经济衰退。"],
  [183,"Stagflation","stag-FLAY-shun","滞胀","金融政策","Stagflation means high inflation and slow growth.","滞胀意味着高通胀和经济增长缓慢。"],
  [184,"Tariff","TAIR-if","关税","金融政策","New tariffs on Chinese goods hurt supply chains.","对中国商品征收新关税损害了供应链。"],
  [185,"Sanction","SANK-shun","制裁","金融政策","Sanctions were imposed on Russian oil exports.","对俄罗斯石油出口实施了制裁。"],
  [186,"Trade war","trayd wor","贸易战","金融政策","The trade war escalated with new tariffs.","贸易战因新关税而升级。"],
  [187,"Geopolitics","jee-oh-POL-ih-tiks","地缘政治","金融政策","Geopolitics is a major driver of oil prices.","地缘政治是油价的主要驱动因素。"],
  [188,"Fiscal policy","FIS-kul POL-ih-see","财政政策","金融政策","Fiscal policy includes government spending and taxes.","财政政策包括政府支出和税收。"],
  [189,"Monetary policy","MON-ih-tair-ee POL-ih-see","货币政策","金融政策","Monetary policy is controlled by the central bank.","货币政策由中央银行控制。"],
  [190,"Debt ceiling","det SEE-ling","债务上限","金融政策","Congress must raise the debt ceiling to avoid default.","国会必须提高债务上限以避免违约。"],
  [191,"Regulation","reg-yuh-LAY-shun","监管","金融政策","Stricter crypto regulation is coming.","更严格的加密货币监管即将到来。"],
  [192,"SEC","es-ee-see","证券交易委员会","金融政策","The SEC approved the first spot BTC ETF.","证券交易委员会批准了首个现货BTC ETF。"],
  [193,"Dollar index","DOL-er IN-deks","美元指数（DXY）","金融政策","A rising dollar index pressures commodities.","美元指数上升对大宗商品形成压力。"],
  [194,"Safe haven","sayf HAY-ven","避险资产","金融政策","Gold and USD are classic safe haven assets.","黄金和美元是经典的避险资产。"],
  [195,"Risk appetite","risk AP-ih-tyt","风险偏好","金融政策","Risk appetite returned after the Fed meeting.","美联储会议后风险偏好回升。"],
  [196,"Model","MOD-ul","（AI）模型","AI行业","GPT-4 is OpenAI's most advanced model.","GPT-4是OpenAI最先进的模型。"],
  [197,"Training","TRAYN-ing","（AI）训练","AI行业","Training large models requires massive compute.","训练大型模型需要巨大的算力。"],
  [198,"Inference","IN-fer-unce","推理，调用","AI行业","Inference cost is dropping rapidly.","推理成本正在迅速下降。"],
  [199,"Fine-tuning","fyn TYOON-ing","微调","AI行业","Fine-tuning adapts a model for specific tasks.","微调使模型适应特定任务。"],
  [200,"Prompt","promt","提示词","AI行业","A well-crafted prompt gives better results.","精心设计的提示词能给出更好的结果。"],
  [201,"Context window","KON-tekst WIN-doh","上下文窗口","AI行业","Gemini has a 1 million token context window.","Gemini有100万token的上下文窗口。"],
  [202,"Token","TOH-kun","词元（计费单位）","AI行业","Most models charge per token used.","大多数模型按使用的token收费。"],
  [203,"Agent","AY-junt","智能体","AI行业","AI agents can browse the web and write code.","AI智能体可以浏览网页和编写代码。"],
  [204,"Multimodal","mul-tee-MOH-dul","多模态","AI行业","Multimodal models understand text, images, and audio.","多模态模型能理解文本、图像和音频。"],
  [205,"Benchmark","BENCH-mark","基准测试","AI行业","This model scores highest on every benchmark.","这个模型在每项基准测试中得分最高。"],
  [206,"Hallucination","huh-loo-sih-NAY-shun","幻觉（AI编造内容）","AI行业","AI hallucination is a major reliability problem.","AI幻觉是一个主要的可靠性问题。"],
  [207,"LLM","el-el-em","大语言模型","AI行业","LLMs are trained on trillions of text tokens.","大语言模型用数万亿个文本token训练。"],
  [208,"Open source","OH-pen sors","开源","AI行业","LLaMA is Meta's open source AI model.","LLaMA是Meta的开源AI模型。"],
  [209,"API","ay-pee-eye","应用程序接口","AI行业","You can access Claude through the Anthropic API.","你可以通过Anthropic API访问Claude。"],
  [210,"AGI","ay-jee-eye","通用人工智能","AI行业","AGI would match human intelligence across all tasks.","通用人工智能将在所有任务上匹配人类智能。"],
  [211,"Alignment","uh-LYN-munt","AI对齐","AI行业","Alignment research ensures AI acts safely.","对齐研究确保AI安全行事。"],
  [212,"Compute","kum-PYOOT","算力","AI行业","More compute leads to smarter models.","更多算力带来更智能的模型。"],
  [213,"GPU","jee-pee-yoo","图形处理器","AI行业","NVIDIA's GPUs dominate AI training.","英伟达的GPU主导AI训练。"],
  [214,"Scaling laws","SKAY-ling lawz","扩展法则","AI行业","Scaling laws show bigger models are usually better.","扩展法则表明更大的模型通常更好。"],
  [215,"RLHF","ar-el-aych-ef","人类反馈强化学习","AI行业","RLHF makes models more helpful and harmless.","RLHF使模型更有帮助且无害。"],
  [216,"Generative AI","JEN-er-uh-tiv ay-eye","生成式AI","AI行业","Generative AI can create text, images, and video.","生成式AI可以创建文本、图像和视频。"],
  [217,"Automation","aw-toh-MAY-shun","自动化","AI行业","AI automation is replacing many white-collar jobs.","AI自动化正在取代许多白领工作。"],
  [218,"Disruption","dis-RUP-shun","颠覆性变革","AI行业","AI is the biggest disruption since the internet.","AI是自互联网以来最大的颠覆性变革。"],
  [219,"Reasoning","REE-zun-ing","推理能力","AI行业","o1 shows strong reasoning on math problems.","o1在数学问题上展示了强大的推理能力。"],
  [220,"Chain of thought","chayn uv thawt","思维链","AI行业","Chain of thought prompting improves accuracy.","思维链提示提升了准确性。"],
  [221,"Frontier model","FRUN-teer MOD-ul","前沿模型","AI行业","Frontier models are at the cutting edge of AI.","前沿模型处于AI的最前沿。"],
  [222,"Agentic","ay-JEN-tik","智能体式的","AI行业","Agentic AI can complete multi-step tasks autonomously.","智能体式AI可以自主完成多步骤任务。"],
  [223,"Diffusion model","dih-FYOO-zhun MOD-ul","扩散模型","AI行业","Midjourney uses a diffusion model to generate images.","Midjourney使用扩散模型生成图像。"],
  [224,"Data center","DAY-tuh SEN-ter","数据中心","AI行业","Tech giants are building massive data centers for AI.","科技巨头正在为AI建设大型数据中心。"],
  [225,"Open weight","OH-pen wayt","开放权重","AI行业","Open weight models can be run locally.","开放权重模型可以在本地运行。"],
  [226,"Click","klik","点击","软件操作","Click the button to confirm.","点击按钮确认。"],
  [227,"Select","sih-LEKT","选择","软件操作","Select all files and delete them.","选择所有文件并删除。"],
  [228,"Enable","en-AY-bul","启用","软件操作","Enable dark mode in settings.","在设置中启用深色模式。"],
  [229,"Disable","dis-AY-bul","禁用","软件操作","Disable notifications for this app.","为此应用禁用通知。"],
  [230,"Toggle","TOG-ul","切换开关","软件操作","Toggle the switch to turn it on.","切换开关将其打开。"],
  [231,"Configure","kun-FIG-yer","配置","软件操作","Configure your settings before launching.","启动前配置您的设置。"],
  [232,"Install","in-STAWL","安装","软件操作","Install the latest version of the software.","安装最新版本的软件。"],
  [233,"Uninstall","un-in-STAWL","卸载","软件操作","Uninstall the app from your device.","从设备上卸载该应用。"],
  [234,"Update","UP-dayt","更新","软件操作","A new update is available, please install.","有新的更新可用，请安装。"],
  [235,"Upgrade","UP-grayd","升级","软件操作","Upgrade to the Pro plan for more features.","升级到专业版计划获取更多功能。"],
  [236,"Download","DOWN-lohd","下载","软件操作","Download the file to your computer.","将文件下载到您的电脑。"],
  [237,"Upload","UP-lohd","上传","软件操作","Upload your profile picture here.","在此上传您的头像。"],
  [238,"Sync","sink","同步","软件操作","Sync your data across all devices.","在所有设备上同步您的数据。"],
  [239,"Backup","BAK-up","备份","软件操作","Backup your data before updating.","更新前备份您的数据。"],
  [240,"Restore","rih-STOR","恢复","软件操作","Restore from your last backup.","从上次备份中恢复。"],
  [241,"Reset","REE-set","重置","软件操作","Reset all settings to default.","将所有设置重置为默认值。"],
  [242,"Cancel","KAN-sul","取消","软件操作","Click Cancel to go back.","点击取消返回。"],
  [243,"Confirm","kun-FERM","确认","软件操作","Confirm your action to proceed.","确认您的操作以继续。"],
  [244,"Submit","sub-MIT","提交","软件操作","Submit the form to register.","提交表单注册。"],
  [245,"Continue","kun-TIN-yoo","继续","软件操作","Click Continue to proceed to the next step.","点击继续进行下一步。"],
  [246,"Skip","skip","跳过","软件操作","Skip this step if not applicable.","如果不适用，跳过此步骤。"],
  [247,"Retry","ree-TRY","重试","软件操作","The connection failed, please retry.","连接失败，请重试。"],
  [248,"Refresh","rih-FRESH","刷新","软件操作","Refresh the page to see updates.","刷新页面查看更新。"],
  [249,"Launch","lawnch","启动","软件操作","Launch the app to get started.","启动应用程序开始使用。"],
  [250,"Save","sayv","保存","软件操作","Save your work before closing.","关闭前保存您的工作。"],
  [251,"Export","EK-sport","导出","软件操作","Export your data as a CSV file.","将您的数据导出为CSV文件。"],
  [252,"Import","IM-port","导入","软件操作","Import your contacts from a file.","从文件导入您的联系人。"],
  [253,"Share","shair","分享","软件操作","Share this document with your team.","与您的团队分享此文档。"],
  [254,"Delete","dih-LEET","删除","软件操作","Are you sure you want to delete this file?","您确定要删除此文件吗？"],
  [255,"Edit","ED-it","编辑","软件操作","Click Edit to make changes.","点击编辑进行更改。"],
  [256,"Preview","PREE-vyoo","预览","软件操作","Preview the file before sending.","发送前预览文件。"],
  [257,"Search","serch","搜索","软件操作","Search for the file by name.","按名称搜索文件。"],
  [258,"Filter","FIL-ter","过滤","软件操作","Filter results by date.","按日期过滤结果。"],
  [259,"Permission","per-MISH-un","权限","软件操作","This app needs permission to access your camera.","此应用需要访问您相机的权限。"],
  [260,"Allow","uh-LOW","允许","软件操作","Click Allow to grant access.","点击允许授予访问权限。"],
  [261,"Deny","dih-NY","拒绝","软件操作","Click Deny to block access.","点击拒绝以阻止访问。"],
  [262,"Warning","WOR-ning","警告","软件操作","Warning: this action cannot be undone.","警告：此操作无法撤销。"],
  [263,"Error","EH-rer","错误","软件操作","An error occurred, please try again.","发生错误，请重试。"],
  [264,"Loading","LOH-ding","加载中","软件操作","Please wait, the page is loading.","请等待，页面正在加载。"],
  [265,"Processing","PROS-es-ing","处理中","软件操作","Processing your payment, please wait.","正在处理您的付款，请等待。"],
  [266,"Failed","fayld","失败","软件操作","Payment failed, please check your card.","付款失败，请检查您的卡。"],
  [267,"Pending","PEN-ding","待处理","软件操作","Your order is pending confirmation.","您的订单待确认。"],
  [268,"Complete","kum-PLEET","完成","软件操作","Setup is complete, you're ready to go.","设置完成，您可以开始使用了。"],
  [269,"Invalid","in-VAL-id","无效","软件操作","Invalid email address, please try again.","无效的电子邮件地址，请重试。"],
  [270,"Required","rih-KWIRD","必填","软件操作","This field is required.","此字段为必填项。"],
  [271,"Optional","OP-shun-ul","可选","软件操作","This field is optional.","此字段为可选项。"],
  [272,"Available","uh-VAY-luh-bul","可用","软件操作","This feature is available on Pro plan.","此功能在专业版计划中可用。"],
  [273,"Unavailable","un-uh-VAY-luh-bul","不可用","软件操作","This service is currently unavailable.","此服务目前不可用。"],
  [274,"Connected","kuh-NEK-tid","已连接","软件操作","Connected to the server successfully.","已成功连接到服务器。"],
  [275,"Disconnected","dis-kuh-NEK-tid","已断开连接","软件操作","You have been disconnected from the server.","您已与服务器断开连接。"],
  [276,"Unauthorized","un-AW-ther-yzd","未授权","软件操作","Unauthorized access detected.","检测到未授权访问。"],
  [277,"Timeout","TYM-owt","超时","软件操作","Connection timeout, please try again.","连接超时，请重试。"],
  [278,"Settings","SET-ingz","设置","软件操作","Go to Settings to change your password.","进入设置更改您的密码。"],
  [279,"Account","uh-KOWNT","账户","软件操作","Your account has been activated.","您的账户已激活。"],
  [280,"Profile","PROH-fyl","个人资料","软件操作","Update your profile information.","更新您的个人资料信息。"],
  [281,"Privacy","PRY-vuh-see","隐私","软件操作","Review our privacy policy here.","在此查看我们的隐私政策。"],
  [282,"Security","sih-KYOOR-ih-tee","安全","软件操作","Enable two-factor authentication for better security.","启用双重验证以提高安全性。"],
  [283,"Notifications","noh-tih-fih-KAY-shunz","通知","软件操作","Turn off notifications to focus.","关闭通知以集中注意力。"],
  [284,"Theme","theem","主题","软件操作","Switch to dark theme for better readability.","切换到深色主题以提高可读性。"],
  [285,"Dashboard","DASH-bord","仪表盘","软件操作","All your stats are on the dashboard.","所有统计数据都在仪表盘上。"],
  [286,"Subscription","sub-SKRIP-shun","订阅","软件操作","Your subscription renews on March 1st.","您的订阅在3月1日续期。"],
  [287,"Billing","BIL-ing","账单","软件操作","Check your billing history in settings.","在设置中查看您的账单历史。"],
  [288,"Trial","TRY-ul","试用","软件操作","Start a 14-day free trial today.","立即开始14天免费试用。"],
  [289,"License","LY-sunce","许可证","软件操作","Your license has expired, please renew.","您的许可证已到期，请续期。"],
  [290,"Version","VER-zhun","版本","软件操作","You are using version 2.1.0.","您正在使用2.1.0版本。"],
  [291,"Patch","pach","补丁更新","软件操作","A security patch was released today.","今天发布了一个安全补丁。"],
  [292,"Feature","FEE-cher","功能","软件操作","This feature is only available to paid users.","此功能仅对付费用户开放。"],
  [293,"Shortcut","SHORT-kut","快捷键","软件操作","Use Ctrl+C as a shortcut to copy.","使用Ctrl+C作为复制的快捷键。"],
  [294,"Pop-up","POP-up","弹窗","软件操作","A pop-up appeared asking for confirmation.","出现了一个弹窗要求确认。"],
  [295,"Dropdown","DROP-down","下拉菜单","软件操作","Select your country from the dropdown.","从下拉菜单中选择您的国家。"],
  [296,"Checkbox","CHEK-boks","复选框","软件操作","Check this checkbox to agree to the terms.","勾选此复选框同意条款。"],
  [297,"Progress bar","PROG-res bar","进度条","软件操作","The progress bar shows 80% complete.","进度条显示已完成80%。"],
  [298,"Screenshot","SKREEN-shot","截图","软件操作","Take a screenshot to share the issue.","截图以分享问题。"],
  [299,"Clipboard","KLIP-bord","剪贴板","软件操作","The text was copied to your clipboard.","文本已复制到剪贴板。"],
  [300,"Two-factor auth","too FAK-ter awth","双重验证","软件操作","Enable 2FA to protect your account.","启用双重验证保护您的账户。"],
  [301,"Cache","kash","缓存","软件操作","Clear the cache to fix display issues.","清除缓存以解决显示问题。"],
  [302,"Cookies","KOOK-eez","Cookie数据","软件操作","Accept cookies to continue browsing.","接受cookies以继续浏览。"],
  [303,"Session","SESH-un","会话","软件操作","Your session has expired, please log in again.","您的会话已过期，请重新登录。"],
  [304,"Verify","VER-ih-fy","验证","软件操作","Verify your email to complete registration.","验证您的邮箱以完成注册。"],
  [305,"Collapse","kuh-LAPS","收起","软件操作","Collapse the menu to save space.","收起菜单以节省空间。"],
  [306,"Expand","ek-SPAND","展开","软件操作","Expand the panel to see more options.","展开面板查看更多选项。"],
  [307,"Scroll","skrohl","滚动","软件操作","Scroll down to see more content.","向下滚动查看更多内容。"],
  [308,"Drag and drop","drag and drop","拖拽","软件操作","Drag and drop files to upload them.","拖拽文件以上传它们。"],
  [309,"Tooltip","TOOL-tip","工具提示","软件操作","Hover over the icon to see the tooltip.","将鼠标悬停在图标上查看工具提示。"],
  [310,"Onboarding","ON-bor-ding","新手引导","软件操作","Complete the onboarding to learn the basics.","完成新手引导以了解基础知识。"],
  [311,"Analyze","AN-uh-lyz","分析","通用","Let me analyze the chart for you.","让我为您分析图表。"],
  [312,"Predict","prih-DIKT","预测","通用","It's hard to predict short-term price moves.","很难预测短期价格走势。"],
  [313,"Expect","ek-SPEKT","预期","通用","Analysts expect a strong Q4.","分析师预期第四季度表现强劲。"],
  [314,"Announce","uh-NOWNS","宣布","通用","The CEO announced a major partnership.","CEO宣布了一项重大合作。"],
  [315,"Indicate","IN-dih-kayt","表明","通用","The data indicates a slowdown is coming.","数据表明经济放缓即将到来。"],
  [316,"Impact","IM-pakt","影响","通用","The news had a major impact on the market.","这条新闻对市场产生了重大影响。"],
  [317,"Trigger","TRIG-er","触发","通用","The news triggered a sharp sell-off.","这条消息触发了急剧抛售。"],
  [318,"Surge","serj","激增，暴涨","通用","Bitcoin surged 15% after the ETF approval.","ETF获批后比特币暴涨15%。"],
  [319,"Plunge","plunj","暴跌","通用","Markets plunged on recession fears.","市场因衰退担忧而暴跌。"],
  [320,"Recover","rih-KUV-er","恢复","通用","The market recovered all its losses by Friday.","市场到周五收复了所有损失。"],
  [321,"Accelerate","ak-SEL-er-ayt","加速","通用","Growth is accelerating in the AI sector.","AI板块的增长正在加速。"],
  [322,"Outperform","owt-per-FORM","跑赢","通用","Tech stocks outperformed the market this year.","科技股今年跑赢了大盘。"],
  [323,"Underperform","un-der-per-FORM","跑输","通用","Energy stocks underperformed in Q2.","能源股在第二季度跑输大盘。"],
  [324,"Exceed","ek-SEED","超过","通用","Revenue exceeded expectations by 10%.","营收超出预期10%。"],
  [325,"Decline","dih-KLYN","下降，下跌","通用","Sales declined 5% year-over-year.","销售额同比下降5%。"],
  [326,"Signal","SIG-nul","信号","通用","The volume surge is a bullish signal.","成交量激增是看涨信号。"],
  [327,"Dominate","DOM-ih-nayt","主导","通用","NVIDIA dominates the AI chip market.","英伟达主导AI芯片市场。"],
  [328,"Significant","sig-NIF-ih-kunt","重大的，显著的","通用","There was a significant drop in volume.","成交量出现了显著下降。"],
  [329,"Critical","KRIT-ih-kul","关键的","通用","This support level is critical to hold.","守住这个支撑位至关重要。"],
  [330,"Key","kee","关键","通用","$80k is a key price level to watch.","8万美元是需要关注的关键价位。"],
  [331,"Potential","puh-TEN-shul","潜在的","通用","This stock has massive upside potential.","这只股票有巨大的上涨潜力。"],
  [332,"Likely","LYK-lee","可能的","通用","A rate cut is likely in September.","9月降息的可能性很大。"],
  [333,"Current","KER-unt","当前的","通用","The current trend is bullish.","当前趋势是看涨的。"],
  [334,"Recent","REE-sunt","最近的","通用","Recent data shows inflation is cooling.","近期数据显示通胀正在降温。"],
  [335,"Upcoming","UP-kum-ing","即将到来的","通用","Watch for the upcoming CPI report.","关注即将发布的CPI报告。"],
  [336,"Global","GLOH-bul","全球的","通用","Global markets are under pressure.","全球市场承压。"],
  [337,"Strong","strong","强劲的","通用","Strong earnings pushed the stock higher.","强劲的财报推高了股价。"],
  [338,"Volatile","VOL-uh-til","波动的","通用","Markets are very volatile right now.","市场目前非常波动。"],
  [339,"Stable","STAY-bul","稳定的","通用","The currency remains stable despite the news.","尽管有消息，货币仍然保持稳定。"],
  [340,"Aggressive","uh-GRES-iv","激进的","通用","The Fed took an aggressive approach to inflation.","美联储对通胀采取了激进的应对方式。"],
  [341,"Conservative","kun-SER-vuh-tiv","保守的","通用","Taking a conservative position makes sense here.","在这里采取保守仓位是合理的。"],
  [342,"Fundamental","fun-duh-MEN-tul","基本面","通用","The fundamentals of this company are strong.","这家公司的基本面很强。"],
  [343,"Technical","TEK-nih-kul","技术面","通用","From a technical perspective, the chart looks bullish.","从技术面看，图表呈看涨态势。"],
  [344,"Macro","MAK-roh","宏观","通用","The macro environment is improving.","宏观环境正在改善。"],
  [345,"Thread","thred","推文串","通用","Check out this thread on the BTC thesis.","看看这个关于BTC投资逻辑的推文串。"],
  [346,"Trending","TREN-ding","热门，趋势","通用","BTC is trending on Twitter today.","BTC今天在推特上是热门话题。"],
  [347,"Breaking","BRAYK-ing","突发（新闻）","通用","Breaking: Fed announces surprise rate cut.","突发：美联储宣布意外降息。"],
  [348,"Confirmed","kun-FERMD","已确认","通用","Confirmed: the deal has been signed.","已确认：协议已签署。"],
  [349,"Update","UP-dayt","最新进展","通用","Here's an update on the situation.","这是最新情况进展。"],
  [350,"Analysis","uh-NAL-ih-sis","分析报告","通用","My analysis suggests we're in a bull market.","我的分析表明我们正处于牛市。"],
  [351,"Summary","SUM-uh-ree","摘要，总结","通用","Here's a quick summary of today's market.","这是今天市场的简要总结。"],
  [352,"Strategy","STRAT-uh-jee","策略","通用","My trading strategy focuses on high timeframes.","我的交易策略专注于高时间框架。"],
  [353,"Risk","risk","风险","通用","Always manage your risk before entering a trade.","进入交易前始终管理好风险。"],
  [354,"Opportunity","op-er-TYOO-nih-tee","机会","通用","This dip is a great buying opportunity.","这次回调是很好的买入机会。"],
  [355,"IMO","eye-em-oh","我个人认为","通用","IMO this is the best entry point.","我个人认为这是最好的入场点。"],
  [356,"TLDR","tee-el-dee-ar","太长不看","通用","TLDR: BTC is bullish, buy the dip.","太长不看：BTC看涨，买入回调。"],
  [357,"According to","uh-KOR-ding too","根据，据…称","通用","According to sources, a deal is close.","据消息人士称，协议即将达成。"],
  [358,"Exclusive","ek-SKLOO-siv","独家（新闻）","通用","Exclusive: leaked documents reveal new details.","独家：泄露文件揭示新细节。"],
  [359,"Developing","dih-VEL-up-ing","持续更新","通用","Developing: more details to follow.","最新发展：更多细节随后跟进。"],
  [360,"Data","DAY-tuh","数据","通用","The data supports a bullish outlook.","数据支持看涨前景。"],
  [361,"Source","sors","来源，消息人士","通用","A reliable source confirmed the news.","一个可靠来源确认了这条消息。"],
  [362,"Community","kuh-MYOO-nih-tee","社区","通用","The crypto community reacted strongly.","加密货币社区反应强烈。"],
  [363,"Platform","PLAT-form","平台","通用","X is the main platform for crypto discussions.","X是加密货币讨论的主要平台。"],
  [364,"Sector","SEK-ter","板块","通用","The DeFi sector is outperforming.","DeFi板块表现优异。"],
  [365,"Network","NET-werk","网络","通用","The Bitcoin network is more secure than ever.","比特币网络比以往任何时候都更安全。"],
  [366,"Exposure","ek-SPOH-zher","敞口，暴露","通用","Reduce your exposure during uncertain times.","在不确定时期减少您的敞口。"],
  [367,"Momentum","moh-MEN-tum","势头，动能","通用","Momentum is building toward the next rally.","下一轮反弹的势头正在积聚。"],
  [368,"Narrative","NAR-uh-tiv","叙事，主题","通用","The narrative around AI is very strong right now.","围绕AI的叙事目前非常强烈。"],
  [369,"Adoption","uh-DOP-shun","采用，普及","通用","Bitcoin adoption is growing worldwide.","比特币的采用正在全球范围内增长。"],
  [370,"Milestone","MYL-stohn","里程碑","通用","Reaching $100k is a major milestone for BTC.","达到10万美元是BTC的重要里程碑。"],

  // ── 开发工具 ──────────────────────────────────────────────────────────────
  [371,"Repository","rih-POZ-ih-tor-ee","代码仓库","开发工具","Create a new repository to start your project.","创建一个新仓库来开始你的项目。"],
  [372,"Commit","kuh-MIT","提交（代码）","开发工具","Don't forget to commit your changes before leaving.","离开之前别忘了提交你的更改。"],
  [373,"Branch","branch","分支","开发工具","Create a new branch for each feature you build.","为你构建的每个功能创建一个新分支。"],
  [374,"Pull Request","pul REE-kwest","拉取请求（PR）","开发工具","Open a pull request to merge your changes.","打开一个PR来合并你的更改。"],
  [375,"Merge","merj","合并代码","开发工具","Merge the branch into main when it's ready.","准备好后将分支合并到主干。"],
  [376,"Fork","fork","Fork（复制他人仓库）","开发工具","Fork the repo to make your own copy.","Fork这个仓库来制作你自己的副本。"],
  [377,"Clone","klohn","克隆（下载仓库）","开发工具","Clone the repository to your local machine.","将仓库克隆到你的本地机器上。"],
  [378,"Push","push","推送（上传代码）","开发工具","Push your commits to the remote repository.","将你的提交推送到远程仓库。"],
  [379,"Pull","pul","拉取（下载更新）","开发工具","Pull the latest changes before you start working.","开始工作之前先拉取最新更改。"],
  [380,"Issue","ISH-oo","议题/任务","开发工具","Open an issue to report a bug you found.","打开一个issue来报告你发现的bug。"],
  [381,"Workflow","WERK-floh","工作流","开发工具","Set up a CI/CD workflow in GitHub Actions.","在GitHub Actions中设置CI/CD工作流。"],
  [382,"Deploy","dih-PLOY","部署","开发工具","Deploy your app to the cloud with one click.","一键将你的应用部署到云端。"],
  [383,"Extension","ek-STEN-shun","扩展插件","开发工具","Install the Prettier extension in VSCode.","在VSCode中安装Prettier扩展。"],
  [384,"Terminal","TER-mih-nul","终端","开发工具","Open the terminal to run your commands.","打开终端来运行你的命令。"],
  [385,"Debugger","dih-BUG-er","调试器","开发工具","Use the debugger to step through the error.","使用调试器逐步定位错误。"],
  [386,"Breakpoint","BRAYK-point","断点","开发工具","Set a breakpoint to pause execution here.","在这里设置断点以暂停执行。"],
  [387,"Snippet","SNIP-it","代码片段","开发工具","Save this as a snippet for future use.","将其保存为代码片段以备将来使用。"],
  [388,"Workspace","WERK-spays","工作区","开发工具","Open the project in a new workspace.","在新工作区中打开项目。"],
  [389,"IntelliSense","in-TEL-ih-sens","智能代码提示","开发工具","IntelliSense suggests completions as you type.","IntelliSense在你输入时自动建议代码补全。"],
  [390,"Autocomplete","AW-toh-kum-pleet","自动补全","开发工具","Autocomplete saves a lot of typing time.","自动补全节省了大量打字时间。"],
  [391,"Endpoint","END-point","接口端点","开发工具","Send a POST request to this API endpoint.","向这个API端点发送POST请求。"],
  [392,"Authentication","aw-then-tih-KAY-shun","身份验证","开发工具","Authentication is required to access the API.","访问API需要进行身份验证。"],
  [393,"Authorization","aw-thor-ih-ZAY-shun","授权","开发工具","Check your authorization level before proceeding.","在继续之前检查你的授权级别。"],
  [394,"Webhook","WEB-huk","网络钩子","开发工具","Set up a webhook to receive real-time events.","设置webhook来接收实时事件。"],
  [395,"Rate Limit","rayt LIM-it","频率限制","开发工具","You hit the rate limit — wait before retrying.","你达到了频率限制，等待后再重试。"],
  [396,"SDK","es-dee-kay","软件开发工具包","开发工具","Download the SDK to start building your app.","下载SDK开始构建你的应用。"],
  [397,"Documentation","dok-yuh-men-TAY-shun","文档","开发工具","Always read the documentation before asking questions.","提问之前务必先阅读文档。"],
  [398,"Version","VER-zhun","版本","开发工具","Make sure you are using the latest version.","确保你使用的是最新版本。"],
  [399,"Release","rih-LEES","发布版本","开发工具","The new release includes important bug fixes.","新版本包含重要的错误修复。"],
  [400,"Pipeline","PYP-lyne","流水线","开发工具","The pipeline runs tests on every push.","流水线在每次推送时自动运行测试。"],
  [401,"Environment","en-VY-run-ment","环境","开发工具","Set your environment variables before running.","运行之前设置好你的环境变量。"],
  [402,"Dependency","dih-PEN-den-see","依赖项","开发工具","Install all dependencies with npm install.","用npm install安装所有依赖项。"],
  [403,"Framework","FRAYM-werk","框架","开发工具","React is the most popular front-end framework.","React是最流行的前端框架。"],
  [404,"Source Control","sors kun-TROHL","源代码管理","开发工具","Use source control to track all your changes.","使用源代码管理来跟踪所有更改。"],
  [405,"Config","KON-fig","配置文件","开发工具","Edit the config file to change your settings.","编辑配置文件来更改设置。"],
  [406,"Package","PAK-ij","软件包","开发工具","Install the package and import it in your code.","安装软件包并在代码中引入它。"],
  [407,"Refactor","ree-FAK-ter","重构代码","开发工具","Refactor the function to make it cleaner.","重构这个函数使其更简洁。"],
  [408,"Staging","STAY-jing","预发布环境","开发工具","Test on staging before pushing to production.","在推送到生产环境之前在预发布环境测试。"],
  [409,"Production","pruh-DUK-shun","生产环境","开发工具","Never test directly on the production server.","永远不要直接在生产服务器上测试。"],
  [410,"Log","log","日志","开发工具","Check the logs to find out what went wrong.","查看日志找出出错的原因。"],

  // ── 软件操作（扩展）──────────────────────────────────────────────────────
  [411,"Toolbar","TOOL-bar","工具栏","软件操作","The toolbar is located at the top of the screen.","工具栏位于屏幕顶部。"],
  [412,"Dropdown","DROP-down","下拉菜单","软件操作","Click the dropdown to see all available options.","点击下拉菜单查看所有可用选项。"],
  [413,"Checkbox","CHEK-boks","复选框","软件操作","Check the checkbox to enable this feature.","勾选复选框以启用此功能。"],
  [414,"Toggle","TOG-ul","切换开关","软件操作","Toggle dark mode on or off in the settings.","在设置中开启或关闭暗黑模式。"],
  [415,"Shortcut","SHORT-kut","快捷键","软件操作","Press Ctrl+Z as the shortcut key to undo.","按Ctrl+Z快捷键来撤销操作。"],
  [416,"Clipboard","KLIP-bord","剪贴板","软件操作","The text was copied to your clipboard.","文字已复制到你的剪贴板。"],
  [417,"Thumbnail","THUM-nayl","缩略图","软件操作","Click on the thumbnail to preview the file.","点击缩略图预览文件。"],
  [418,"Render","REN-der","渲染","软件操作","Rendering the video will take a few minutes.","渲染视频需要几分钟。"],
  [419,"Export","EK-sport","导出","软件操作","Export the file in MP4 format when done.","完成后以MP4格式导出文件。"],
  [420,"Import","IM-port","导入","软件操作","Import your footage to start editing.","导入你的素材开始剪辑。"],
  [421,"Timeline","TYM-lyne","时间轴","软件操作","Drag the clip onto the timeline to add it.","将片段拖到时间轴上以添加它。"],
  [422,"Clip","klip","视频片段","软件操作","Trim the clip to remove the unwanted parts.","剪辑片段以删除不需要的部分。"],
  [423,"Transition","tran-SIZH-un","转场效果","软件操作","Add a fade transition between the two clips.","在两个片段之间添加淡入淡出转场。"],
  [424,"Keyframe","KEE-fraym","关键帧","软件操作","Set a keyframe to animate the text position.","设置关键帧来制作文字位置动画。"],
  [425,"Caption","KAP-shun","字幕","软件操作","Add captions so viewers can follow without sound.","添加字幕，让观众无需声音也能看懂。"],
  [426,"Spreadsheet","SPRED-sheet","电子表格","软件操作","Open the spreadsheet to analyze the data.","打开电子表格来分析数据。"],
  [427,"Formula","FOR-myoo-luh","公式","软件操作","Use a formula to calculate totals automatically.","使用公式自动计算合计。"],
  [428,"Pivot Table","PIV-ut TAY-bul","数据透视表","软件操作","A pivot table helps you summarize large datasets.","数据透视表帮助你汇总大型数据集。"],
  [429,"Conditional Formatting","kun-DISH-un-ul FOR-mat-ing","条件格式","软件操作","Use conditional formatting to highlight high values.","使用条件格式来突出显示高值。"],
  [430,"Notification","noh-tih-fih-KAY-shun","通知","软件操作","Turn off notifications to stay focused.","关闭通知以保持专注。"],
  [431,"Sync","sink","同步","软件操作","Sync your files so they are available on all devices.","同步你的文件以便在所有设备上使用。"],
  [432,"Backup","BAK-up","备份","软件操作","Create a backup before making major changes.","在进行重大更改之前创建备份。"],
  [433,"Plugin","PLUG-in","插件","软件操作","Install a plugin to extend the software's features.","安装插件以扩展软件的功能。"],
  [434,"Dashboard","DASH-bord","仪表板","软件操作","The dashboard shows all your key metrics at a glance.","仪表板一目了然地显示所有关键指标。"],
  [435,"Template","TEM-plit","模板","软件操作","Use a template to save time and keep things consistent.","使用模板以节省时间并保持一致性。"],
  [436,"Preview","PREE-vyoo","预览","软件操作","Click Preview to see how the final result looks.","点击预览查看最终效果。"],
  [437,"Permission","per-MISH-un","权限","软件操作","You need permission to access this folder.","你需要权限才能访问此文件夹。"],
  [438,"Account","uh-KOWNT","账户","软件操作","Log in to your account to continue.","登录你的账户以继续。"],
  [439,"Profile","PROH-fyl","个人资料","软件操作","Update your profile with a photo and bio.","用照片和简介更新你的个人资料。"],
  [440,"Preferences","PREF-er-ens-iz","偏好设置","软件操作","Go to Preferences to customize your experience.","前往偏好设置自定义你的体验。"],

  // ── 社交媒体 ──────────────────────────────────────────────────────────────
  [441,"Feed","feed","信息流","社交媒体","Scroll through your feed to see the latest posts.","滚动查看你的信息流以看到最新帖子。"],
  [442,"Reel","reel","短视频（Reel）","社交媒体","Post a Reel to reach a wider audience.","发布一个Reel来接触更广泛的受众。"],
  [443,"Story","STOR-ee","限时动态","社交媒体","Post a story that disappears after 24 hours.","发布24小时后消失的限时动态。"],
  [444,"DM","dee-em","私信（直接消息）","社交媒体","Send me a DM if you have any questions.","如果有任何问题请给我发私信。"],
  [445,"Mention","MEN-shun","@提及","社交媒体","Mention someone to tag them in your post.","使用@提及某人以在帖子中标记他们。"],
  [446,"Hashtag","HASH-tag","话题标签","社交媒体","Use relevant hashtags to increase your reach.","使用相关话题标签来增加触达人数。"],
  [447,"Algorithm","AL-gor-ith-um","推荐算法","社交媒体","The algorithm favors high-engagement content.","推荐算法青睐高互动度的内容。"],
  [448,"Engagement","en-GAYJ-ment","互动（率）","社交媒体","High engagement tells the algorithm your content is valuable.","高互动率告诉算法你的内容有价值。"],
  [449,"Follower","FOL-oh-er","粉丝","社交媒体","I gained 1,000 followers in a single week.","我在一周内增加了1,000名粉丝。"],
  [450,"Retweet","ree-TWEET","转推","社交媒体","Retweet this post if you find it useful.","如果你觉得这个帖子有用请转推。"],
  [451,"Quote","kwoht","引用转推","社交媒体","Quote the tweet and add your own thoughts.","引用这条推文并添加你自己的想法。"],
  [452,"Bookmark","BUK-mark","书签（收藏）","社交媒体","Bookmark this post to read it later.","将这个帖子加入书签以便稍后阅读。"],
  [453,"Pin","pin","置顶","社交媒体","Pin your most important post to the top of your profile.","将最重要的帖子置顶到你的主页顶部。"],
  [454,"Channel","CHAN-ul","频道","社交媒体","Subscribe to this channel for daily crypto updates.","订阅这个频道获取每日加密货币更新。"],
  [455,"Group","groop","群组","社交媒体","Join the Telegram group to receive announcements.","加入Telegram群组接收公告。"],
  [456,"Bot","bot","机器人账号","社交媒体","This account looks like a bot, not a real person.","这个账户看起来像机器人，而不是真人。"],
  [457,"Verified","VAIR-ih-fyd","已认证","社交媒体","Only verified accounts get the blue checkmark.","只有经过认证的账户才能获得蓝色勾选标记。"],
  [458,"Impression","im-PRESH-un","曝光量","社交媒体","This post got over 500,000 impressions.","这个帖子获得了超过50万次曝光。"],
  [459,"Reach","reech","触达人数","社交媒体","Post consistently to increase your organic reach.","持续发帖以增加你的自然触达人数。"],
  [460,"Viral","VY-rul","病毒式传播","社交媒体","The video went viral and hit 10 million views.","这个视频病毒式传播，获得了1000万次观看。"],
  [461,"Influencer","IN-floo-en-ser","网红，意见领袖","社交媒体","Partner with an influencer to grow your audience faster.","与网红合作以更快地扩大你的受众。"],
  [462,"Subscribe","sub-SKRYB","订阅","社交媒体","Subscribe and hit the bell to never miss a video.","订阅并点击铃铛以不错过任何视频。"],
  [463,"Monetize","MON-eh-tyz","变现","社交媒体","You need 1,000 subscribers to start monetizing.","你需要1,000名订阅者才能开始变现。"],
  [464,"Analytics","an-uh-LIT-iks","数据分析","社交媒体","Check your analytics to see what content performs best.","查看数据分析了解哪些内容表现最好。"],
  [465,"Trending","TREN-ding","正在热门","社交媒体","This topic is trending worldwide right now.","这个话题目前正在全球热门。"],

  // ── 电商平台 ──────────────────────────────────────────────────────────────
  [466,"Checkout","CHEK-owt","结账","电商平台","Click checkout to complete your purchase.","点击结账完成你的购买。"],
  [467,"Cart","kart","购物车","电商平台","Add items to your cart before checking out.","在结账之前将商品添加到购物车。"],
  [468,"Inventory","IN-ven-tor-ee","库存","电商平台","Check your inventory before confirming the order.","在确认订单之前检查你的库存。"],
  [469,"SKU","es-kay-yoo","商品编号","电商平台","Each product variant needs its own unique SKU.","每个产品变体需要其独特的商品编号。"],
  [470,"Fulfillment","ful-FIL-ment","订单履约（发货）","电商平台","Fulfillment usually takes 1 to 3 business days.","订单履约通常需要1到3个工作日。"],
  [471,"Tracking","TRAK-ing","物流追踪","电商平台","Use the tracking number to check your shipment status.","使用追踪号码查看你的货物状态。"],
  [472,"Refund","REE-fund","退款","电商平台","Request a refund within 30 days of purchase.","在购买后30天内申请退款。"],
  [473,"Dispute","dis-PYOOT","交易纠纷","电商平台","Open a dispute if the item doesn't arrive.","如果商品未到达，请发起交易纠纷。"],
  [474,"Listing","LIS-ting","商品列表","电商平台","Optimize your listing title for better search ranking.","优化你的商品列表标题以获得更好的搜索排名。"],
  [475,"Conversion Rate","kun-VER-zhun rayt","转化率","电商平台","Improving your page layout can boost conversion rate.","改善页面布局可以提升转化率。"],
  [476,"Promotion","pruh-MOH-shun","促销活动","电商平台","Run a flash promotion to boost sales quickly.","运行限时促销活动以快速提升销售额。"],
  [477,"Coupon","KOO-pon","优惠券","电商平台","Enter the coupon code at checkout for a discount.","在结账时输入优惠券代码享受折扣。"],
  [478,"Affiliate","uh-FIL-ee-it","联盟营销","电商平台","Earn commissions by joining the affiliate program.","通过加入联盟计划赚取佣金。"],
  [479,"Dropshipping","DROP-ship-ing","代发货（无需备货）","电商平台","Dropshipping lets you sell without holding any inventory.","代发货让你无需持有库存即可销售。"],
  [480,"Return Policy","rih-TERN POL-ih-see","退货政策","电商平台","Read the return policy before you buy.","购买前请阅读退货政策。"],

  // ── 加密货币（扩展）──────────────────────────────────────────────────────
  [481,"DeFi","dee-fy","去中心化金融","加密货币","DeFi lets you earn yield without using a bank.","DeFi让你无需银行即可赚取收益。"],
  [482,"Liquidity Pool","lih-KWID-ih-tee pool","流动性池","加密货币","Deposit tokens into the liquidity pool to earn fees.","将代币存入流动性池以赚取手续费。"],
  [483,"Yield Farming","yeeld FAR-ming","收益耕作","加密货币","Yield farming can generate very high APY returns.","收益耕作可以产生非常高的APY回报。"],
  [484,"Staking","STAYK-ing","质押","加密货币","Stake your ETH to earn staking rewards.","质押你的ETH以赚取质押奖励。"],
  [485,"Governance","GUV-ern-uns","协议治理","加密货币","Token holders vote on governance proposals.","代币持有者对治理提案进行投票。"],
  [486,"DAO","dow","去中心化自治组织","加密货币","The DAO voted to change the protocol fee structure.","DAO投票决定更改协议费用结构。"],
  [487,"Smart Contract","smart KON-trakt","智能合约","加密货币","The smart contract executes automatically when triggered.","智能合约在触发时自动执行。"],
  [488,"Gas Fee","gas fee","链上手续费（Gas费）","加密货币","High gas fees make small transactions expensive on Ethereum.","高Gas费使以太坊上的小额交易变得昂贵。"],
  [489,"Slippage","SLIP-ij","滑点","加密货币","Set slippage to 1% for stable pairs to avoid failures.","为稳定对设置1%滑点以避免交易失败。"],
  [490,"Impermanent Loss","im-PER-muh-nent los","无常损失","加密货币","Impermanent loss happens when pool token prices diverge.","当流动性池中代币价格出现偏差时会发生无常损失。"],
  [491,"TVL","tee-vee-el","总锁仓量","加密货币","The protocol's TVL crossed $1 billion this week.","该协议的总锁仓量本周突破10亿美元。"],
  [492,"DEX","deks","去中心化交易所","加密货币","Trade tokens on a DEX without needing KYC.","在去中心化交易所上交易代币无需KYC验证。"],
  [493,"AMM","ay-em-em","自动做市商","加密货币","Uniswap uses an AMM model instead of an order book.","Uniswap使用自动做市商模型而非订单簿。"],
  [494,"Protocol","PROH-tuh-kol","协议","加密货币","This protocol has been audited and is considered safe.","这个协议已经过审计，被认为是安全的。"],
  [495,"Mint","mint","铸造（NFT/代币）","加密货币","Mint your NFT before the public sale begins.","在公开销售开始之前铸造你的NFT。"],
  [496,"Floor Price","flor prys","（NFT）地板价","加密货币","The floor price of this collection dropped to 0.5 ETH.","这个系列的地板价下降到了0.5 ETH。"],
  [497,"Airdrop","AIR-drop","空投","加密货币","The team announced an airdrop for early users.","团队为早期用户宣布了空投活动。"],
  [498,"Whitelist","WYT-list","白名单","加密货币","Get on the whitelist to secure your mint spot.","进入白名单以确保你的铸造名额。"],
  [499,"Vesting","VES-ting","锁仓解锁期","加密货币","Team tokens have a 2-year vesting schedule.","团队代币有2年的锁仓解锁时间表。"],
  [500,"Tokenomics","toh-ken-OM-iks","代币经济学","加密货币","Study the tokenomics carefully before investing.","在投资之前仔细研究代币经济学。"],
  [501,"Circulating Supply","SER-kyoo-lay-ting SUP-ly","流通供应量","加密货币","Only 40% of the total supply is circulating now.","目前只有40%的总供应量在流通。"],
  [502,"Fully Diluted","ful-ee dih-LOO-tid","完全稀释估值（FDV）","加密货币","The fully diluted valuation is $5 billion.","完全稀释估值为50亿美元。"],
  [503,"Perpetual","per-PECH-oo-ul","永续合约","加密货币","Trade BTC perpetuals with up to 20x leverage.","以最高20倍杠杆交易BTC永续合约。"],
  [504,"Funding Rate","FUN-ding rayt","资金费率","加密货币","High positive funding rate signals the market is overheated.","高正资金费率表明市场过热。"],
  [505,"Open Interest","OH-pen IN-ter-est","未平仓合约量","加密货币","Rising open interest confirms bullish momentum.","未平仓量上升确认了看涨势头。"],
  [506,"Liquidation","lik-wid-AY-shun","强制平仓","加密货币","Avoid liquidation by keeping your margin above the threshold.","通过保持保证金高于阈值来避免强制平仓。"],
  [507,"Spot","spot","现货","加密货币","Buy spot if you want to avoid leverage risk entirely.","如果想完全避免杠杆风险就买现货。"],
  [508,"Order Book","OR-der buk","订单簿","加密货币","Check the order book to see where buy and sell walls are.","查看订单簿了解买卖盘所在位置。"],
  [509,"Bid","bid","买价","加密货币","The bid is the highest price a buyer is willing to pay.","买价是买家愿意支付的最高价格。"],
  [510,"Ask","ask","卖价","加密货币","The ask is the lowest price a seller will accept.","卖价是卖家愿意接受的最低价格。"],
  [511,"On-chain","on-chayn","链上","加密货币","On-chain data shows whales are actively accumulating.","链上数据显示巨鲸正在积极积累。"],
  [512,"Cold Wallet","kohld WAL-it","冷钱包","加密货币","Store large amounts in a cold wallet for security.","为了安全，将大量资产存放在冷钱包中。"],
  [513,"Seed Phrase","seed frayz","助记词","加密货币","Never share your seed phrase with anyone, ever.","永远不要将你的助记词分享给任何人。"],
  [514,"Whale","wayl","巨鲸（大户）","加密货币","Whale wallets are accumulating aggressively at this level.","巨鲸钱包正在这个价位积极积累。"],
  [515,"Layer 2","LAY-er too","Layer 2（二层扩展）","加密货币","Layer 2 solutions reduce gas fees significantly.","Layer 2解决方案显著降低了Gas费用。"],
  [516,"Bridge","brij","跨链桥","加密货币","Use the bridge to move assets from Ethereum to Arbitrum.","使用跨链桥将资产从以太坊转移到Arbitrum。"],
  [517,"Halving","HAV-ing","减半（比特币）","加密货币","The Bitcoin halving cuts block rewards in half.","比特币减半将区块奖励削减一半。"],
  [518,"Mempool","MEM-pool","内存池（待处理交易）","加密货币","The mempool is congested, so fees are high right now.","内存池拥堵，所以现在手续费很高。"],
  [519,"Audit","AW-dit","安全审计","加密货币","Always check if the protocol has been audited before using it.","在使用协议之前务必检查它是否经过审计。"],
  [520,"Rug Pull","rug pul","跑路（欺诈项目）","加密货币","The project turned out to be a rug pull.","这个项目结果是一个欺诈跑路项目。"],

  // ── 链上分析 ──────────────────────────────────────────────────────────────
  [521,"MVRV","em-vee-ar-vee","市场价值对已实现价值比","链上分析","MVRV above 3.5 historically signals a market top.","历史上MVRV高于3.5表明市场见顶。"],
  [522,"SOPR","soh-pr","已花费产出利润率","链上分析","SOPR below 1 means coins are being sold at a loss.","SOPR低于1意味着持币者在亏损出售。"],
  [523,"Realized Price","REE-uh-lyzd prys","已实现价格（平均持仓成本）","链上分析","BTC is trading well above its realized price.","BTC的交易价格远高于其已实现价格。"],
  [524,"HODL Waves","HOD-ul wayvz","持币时间分布","链上分析","HODL waves reveal long-term holder accumulation patterns.","持币时间分布揭示了长期持有者的积累模式。"],
  [525,"Exchange Inflow","eks-CHAYNJ IN-floh","交易所流入量","链上分析","A spike in exchange inflow often signals incoming selling.","交易所流入量激增通常表明即将出现抛售。"],
  [526,"Exchange Outflow","eks-CHAYNJ OWT-floh","交易所流出量","链上分析","Large exchange outflows indicate strong accumulation.","大量交易所流出表明强烈的积累信号。"],
  [527,"Supply in Profit","SUP-ly in PROF-it","处于盈利状态的供应比例","链上分析","When 95% of supply is in profit, a top is near.","当95%的供应量处于盈利状态时，顶部临近。"],
  [528,"Dormant Coins","DOR-munt koynz","休眠币（长期未动的币）","链上分析","Old dormant coins moving signals a potential top.","老旧休眠币的移动表明潜在的顶部信号。"],
  [529,"NVT","en-vee-tee","网络价值对交易量比","链上分析","A high NVT ratio suggests the market is overvalued.","高NVT比率表明市场被高估。"],
  [530,"Hash Rate","hash rayt","算力","链上分析","Rising hash rate shows miners are confident in the price.","算力上升显示矿工对价格充满信心。"],
  [531,"Miner","MY-ner","矿工","链上分析","Miners sold heavily ahead of the halving event.","矿工在减半事件前大量抛售。"],
  [532,"Block","blok","区块","链上分析","A new Bitcoin block is mined every 10 minutes.","每10分钟开采一个新的比特币区块。"],
  [533,"Glassnode","GLAS-nohd","Glassnode（链上数据平台）","链上分析","Glassnode provides the best on-chain analytics in crypto.","Glassnode提供加密货币领域最好的链上数据分析。"],
  [534,"Accumulation","uh-kyoo-myoo-LAY-shun","积累阶段","链上分析","On-chain data confirms smart money is in accumulation mode.","链上数据确认聪明钱处于积累模式。"],
  [535,"Distribution","dis-trih-BYOO-shun","分配阶段（出货）","链上分析","Whale wallets appear to be in distribution mode.","巨鲸钱包似乎处于出货模式。"],

  // ── 股票金融（扩展）──────────────────────────────────────────────────────
  [536,"Market Order","MAR-ket OR-der","市价单","股票金融","A market order fills immediately at the current price.","市价单以当前价格立即成交。"],
  [537,"Limit Order","LIM-it OR-der","限价单","股票金融","Place a limit order to buy at your target price.","下限价单以你的目标价格买入。"],
  [538,"Stop Loss","stop los","止损","股票金融","Always set a stop loss to protect your capital.","始终设置止损来保护你的本金。"],
  [539,"Take Profit","tayk PROF-it","止盈","股票金融","Set a take profit target before entering the trade.","在进入交易之前设置止盈目标。"],
  [540,"Portfolio","port-FOH-lee-oh","投资组合","股票金融","Diversify your portfolio to manage risk properly.","多元化你的投资组合以妥善管理风险。"],
  [541,"Hedge","hej","对冲","股票金融","Buy put options to hedge against a market downturn.","购买看跌期权以对冲市场下行风险。"],
  [542,"Beta","BAY-tuh","贝塔值（波动相关性）","股票金融","A high-beta stock amplifies both gains and losses.","高贝塔股票会放大收益和损失。"],
  [543,"Alpha","AL-fuh","阿尔法（超额收益）","股票金融","Generating consistent alpha is the goal of every trader.","产生持续的超额收益是每个交易者的目标。"],
  [544,"Support Level","suh-PORT LEV-ul","支撑位","股票金融","The stock bounced strongly off the $50 support level.","该股票从50美元支撑位强势反弹。"],
  [545,"Resistance Level","rih-ZIS-tuns LEV-ul","阻力位","股票金融","$80 has been a strong resistance level for months.","80美元几个月来一直是强阻力位。"],
  [546,"Moving Average","MOO-ving AV-er-ij","移动平均线","股票金融","The price crossed above the 200-day moving average.","价格突破200日移动平均线上方。"],
  [547,"RSI","ar-es-eye","相对强弱指数","股票金融","RSI above 70 means the asset may be overbought.","RSI高于70意味着资产可能已超买。"],
  [548,"MACD","em-ay-see-dee","MACD指标","股票金融","A MACD bullish crossover is a buy signal.","MACD金叉是买入信号。"],
  [549,"Bollinger Bands","BOL-in-jer bandz","布林带","股票金融","Price near the lower Bollinger Band may signal oversold.","价格接近布林带下轨可能表明超卖。"],
  [550,"Volume","VOL-yoom","成交量","股票金融","A breakout on high volume is more reliable.","高成交量的突破更可信。"],
  [551,"Breakout","BRAYK-owt","价格突破","股票金融","Wait for a confirmed breakout before entering the trade.","在进入交易前等待确认突破。"],
  [552,"Pullback","PUL-bak","回调","股票金融","Buy the pullback after a strong breakout.","在强势突破后的回调中买入。"],
  [553,"Candlestick","KAN-dul-stik","K线（蜡烛图）","股票金融","Learn to read candlestick patterns to improve your timing.","学会阅读K线形态以改善你的入场时机。"],
  [554,"P/E Ratio","pee-ee RAY-shee-oh","市盈率","股票金融","A low P/E ratio may indicate the stock is undervalued.","低市盈率可能表明该股票被低估。"],
  [555,"EPS","ee-pee-es","每股收益","股票金融","EPS beat analyst estimates this quarter.","本季度每股收益超出分析师预期。"],
  [556,"Revenue","REV-en-yoo","营收","股票金融","Revenue grew 25% year over year.","营收同比增长25%。"],
  [557,"Earnings","ER-ningz","盈利 / 财报结果","股票金融","Strong earnings sent the stock up 10% after hours.","强劲的盈利使该股票盘后上涨10%。"],
  [558,"Guidance","GY-duns","业绩指引","股票金融","Management raised full-year guidance above expectations.","管理层将全年业绩指引上调至超出预期。"],
  [559,"Dividend","DIV-ih-dend","股息","股票金融","The company increased its quarterly dividend by 10%.","该公司将季度股息增加了10%。"],
  [560,"Cash Flow","kash floh","现金流","股票金融","Positive free cash flow is a sign of a healthy business.","正向自由现金流是健康业务的标志。"],
  [561,"Balance Sheet","BAL-uns sheet","资产负债表","股票金融","A clean balance sheet means low debt and strong reserves.","干净的资产负债表意味着低债务和强大的储备。"],
  [562,"Beat","beet","超出预期","股票金融","The company beat both revenue and EPS estimates.","该公司同时超出营收和每股收益预期。"],
  [563,"Miss","mis","低于预期","股票金融","The stock dropped after the company missed revenue estimates.","该公司低于营收预期后股价下跌。"],
  [564,"Analyst","AN-uh-list","分析师","股票金融","Wall Street analysts upgraded the stock to a Buy rating.","华尔街分析师将该股票升级为买入评级。"],
  [565,"Target Price","TAR-git prys","目标价格","股票金融","The analyst set a 12-month target price of $250.","分析师设定了12个月250美元的目标价格。"],
  [566,"Watchlist","WOCH-list","自选股列表","股票金融","I have 20 stocks on my watchlist right now.","我目前的自选股列表上有20只股票。"],
  [567,"Alert","uh-LERT","价格提醒","股票金融","Set a price alert so you don't miss the breakout.","设置价格提醒以免错过突破。"],
  [568,"Backtest","BAK-test","回测","股票金融","Backtest your strategy on 10 years of historical data.","在10年历史数据上回测你的策略。"],
  [569,"Indicator","IN-dih-kay-ter","技术指标","股票金融","Use multiple indicators to confirm your trade setup.","使用多个技术指标来确认你的交易设置。"],
  [570,"Market Cap","MAR-ket kap","市值","股票金融","Companies with a market cap over $10B are large-cap stocks.","市值超过100亿美元的公司是大盘股。"],
  [571,"Sector Rotation","SEK-ter roh-TAY-shun","板块轮动","股票金融","Sector rotation signals a shift in market leadership.","板块轮动表明市场领导权的转变。"],

  // ── 金融政策（扩展）──────────────────────────────────────────────────────
  [572,"Interest Rate","IN-ter-est rayt","利率","金融政策","The Fed raised interest rates by 25 basis points.","美联储将利率上调了25个基点。"],
  [573,"Inflation","in-FLAY-shun","通货膨胀","金融政策","Inflation hit a 40-year high last year.","通货膨胀去年达到40年来最高点。"],
  [574,"CPI","see-pee-eye","消费者价格指数","金融政策","CPI data came in higher than expected this month.","本月CPI数据高于预期。"],
  [575,"PPI","pee-pee-eye","生产者价格指数","金融政策","PPI measures inflation at the wholesale level.","PPI衡量批发层面的通货膨胀。"],
  [576,"GDP","jee-dee-pee","国内生产总值","金融政策","GDP grew by 2.5% in the last quarter.","上季度GDP增长了2.5%。"],
  [577,"FOMC","ef-oh-em-see","联邦公开市场委员会","金融政策","Markets rallied after a dovish FOMC statement.","在鸽派FOMC声明发布后市场上涨。"],
  [578,"Quantitative Easing","KWON-tih-tay-tiv EE-zing","量化宽松（QE）","金融政策","Quantitative easing injects money into the economy.","量化宽松向经济注入资金。"],
  [579,"Tapering","TAY-per-ing","缩减购债（缩表）","金融政策","Tapering signals the Fed is pulling back stimulus.","缩表表明美联储正在收紧刺激措施。"],
  [580,"Basis Point","BAY-sis point","基点（0.01%）","金融政策","A 25 basis point rate hike is widely expected.","25个基点的加息被广泛预期。"],
  [581,"Hawkish","HAW-kish","鹰派（偏向加息紧缩）","金融政策","The hawkish Fed statement surprised the markets.","美联储的鹰派声明令市场感到意外。"],
  [582,"Dovish","DUV-ish","鸽派（偏向降息宽松）","金融政策","Dovish comments from the Fed pushed stocks higher.","美联储的鸽派言论推动股市上涨。"],
  [583,"Recession","rih-SESH-un","经济衰退","金融政策","Two consecutive quarters of negative GDP means recession.","连续两个季度GDP负增长意味着衰退。"],
  [584,"Stagflation","stag-FLAY-shun","滞胀","金融政策","Stagflation combines high inflation with low growth.","滞胀将高通胀与低增长结合在一起。"],
  [585,"Yield Curve","yeeld kerv","收益率曲线","金融政策","An inverted yield curve often signals an upcoming recession.","倒挂的收益率曲线通常预示即将到来的衰退。"],
  [586,"Treasury","TREZH-er-ee","国债 / 财政部","金融政策","10-year Treasury yields rose sharply this week.","本周10年期国债收益率大幅上升。"],
  [587,"Debt Ceiling","det SEE-ling","债务上限","金融政策","Congress must raise the debt ceiling to avoid default.","国会必须提高债务上限以避免违约。"],
  [588,"Fiscal Policy","FIS-kul POL-ih-see","财政政策","金融政策","Fiscal policy includes government spending and taxation.","财政政策包括政府支出和税收。"],
  [589,"Monetary Policy","MON-ih-tair-ee POL-ih-see","货币政策","金融政策","The central bank uses monetary policy to fight inflation.","中央银行使用货币政策来对抗通货膨胀。"],
  [590,"Federal Reserve","FED-er-ul rih-ZERV","美联储","金融政策","The Federal Reserve controls US interest rate policy.","美联储控制美国利率政策。"],

  // ── AI行业（扩展）────────────────────────────────────────────────────────
  [591,"LLM","el-el-em","大型语言模型","AI行业","GPT-4 is one of the most powerful LLMs available today.","GPT-4是目前可用的最强大LLM之一。"],
  [592,"Transformer","trans-FOR-mer","Transformer模型架构","AI行业","The transformer architecture revolutionized modern AI.","Transformer架构彻底改变了现代AI。"],
  [593,"Neural Network","NYOOR-ul NET-werk","神经网络","AI行业","Deep learning is built on multi-layer neural networks.","深度学习建立在多层神经网络上。"],
  [594,"Training","TRAYN-ing","模型训练","AI行业","Training a large model requires enormous computing resources.","训练一个大型模型需要巨大的计算资源。"],
  [595,"Inference","IN-fer-uns","模型推理（运行）","AI行业","Faster inference speed improves the user experience.","更快的推理速度改善了用户体验。"],
  [596,"Fine-tuning","FYN-too-ning","微调（模型）","AI行业","Fine-tuning adapts a base model to a specific use case.","微调使基础模型适应特定的使用场景。"],
  [597,"RLHF","ar-el-aych-ef","基于人类反馈的强化学习","AI行业","RLHF makes AI models more helpful and aligned.","RLHF使AI模型更有帮助且更符合人类意图。"],
  [598,"Prompt","promt","提示词","AI行业","A well-crafted prompt leads to a much better response.","精心设计的提示词会带来更好的回答。"],
  [599,"Token","TOH-ken","令牌（AI文本单元）","AI行业","This model supports a 200,000 token context window.","这个模型支持200,000个令牌的上下文窗口。"],
  [600,"Context Window","KON-tekst WIN-doh","上下文窗口（记忆范围）","AI行业","A larger context window handles longer conversations.","更大的上下文窗口可以处理更长的对话。"],
  [601,"Embedding","em-BED-ing","向量嵌入","AI行业","Text embeddings are used to power semantic search.","文本向量嵌入用于驱动语义搜索。"],
  [602,"Vector Database","VEK-ter DAY-tuh-bays","向量数据库","AI行业","Store embeddings in a vector database for fast retrieval.","将嵌入存储在向量数据库中以实现快速检索。"],
  [603,"RAG","rag","检索增强生成","AI行业","RAG improves accuracy by retrieving relevant documents first.","RAG通过先检索相关文档来提高准确性。"],
  [604,"Hallucination","huh-loo-sih-NAY-shun","幻觉（AI错误输出）","AI行业","AI hallucinations are a major challenge for production use.","AI幻觉是生产使用中的主要挑战。"],
  [605,"Benchmark","BENCH-mark","基准测试","AI行业","This model ranks first on the MMLU benchmark test.","这个模型在MMLU基准测试中排名第一。"],
  [606,"Multimodal","mul-tee-MOH-dul","多模态（图文音视频）","AI行业","Multimodal models can process both text and images.","多模态模型可以同时处理文本和图像。"],
  [607,"Agent","AY-jent","AI代理","AI行业","AI agents can autonomously browse the web and complete tasks.","AI代理可以自主浏览网页并完成任务。"],
  [608,"Reasoning","REE-zun-ing","推理能力（AI）","AI行业","Better reasoning makes the model more reliable.","更强的推理能力使模型更可靠。"],
  [609,"Copilot","KOH-py-lot","AI编程助手","AI行业","GitHub Copilot suggests code completions as you type.","GitHub Copilot在你输入时建议代码补全。"],
  [610,"Open Source","OH-pen sors","开源","AI行业","Llama is an open-source model released by Meta.","Llama是Meta发布的开源模型。"],
  [611,"System Prompt","SIS-tem promt","系统提示词","AI行业","The system prompt defines the AI's role and behavior.","系统提示词定义了AI的角色和行为。"],
  [612,"Temperature","TEM-per-uh-cher","温度参数（随机性）","AI行业","Set a higher temperature for more creative outputs.","设置更高的温度以获得更有创意的输出。"],
  [613,"Anthropic","an-THROH-pik","Anthropic（AI公司）","AI行业","Anthropic built Claude with a focus on AI safety.","Anthropic以AI安全为重点构建了Claude。"],
  [614,"OpenAI","oh-pen-AY-eye","OpenAI（AI公司）","AI行业","OpenAI launched ChatGPT and changed the industry.","OpenAI推出了ChatGPT，改变了整个行业。"],
  [615,"Cursor","KER-ser","Cursor（AI代码编辑器）","AI行业","Cursor is an AI-powered IDE built on top of VSCode.","Cursor是建立在VSCode之上的AI驱动IDE。"],
  [616,"Claude","klawd","Claude（AI模型）","AI行业","Claude is known for strong reasoning and long context.","Claude以强大的推理能力和长上下文著称。"],
  [617,"Gemini","JEM-ih-nee","Gemini（谷歌AI模型）","AI行业","Gemini is Google's flagship multimodal AI model.","Gemini是谷歌的旗舰多模态AI模型。"],
  [618,"Parameter","puh-RAM-ih-ter","模型参数量","AI行业","This model has 70 billion parameters.","这个模型有700亿个参数。"],
  [619,"Latency","LAY-ten-see","延迟（响应时间）","AI行业","Low latency is critical for real-time AI applications.","低延迟对实时AI应用至关重要。"],
  [620,"Prompt Engineering","promt en-jih-NEER-ing","提示词工程","AI行业","Prompt engineering is the skill of writing effective prompts.","提示词工程是编写有效提示词的技能。"],
];

const toVocab = raw => raw.map(([id,word,phonetic,meaning,module,example,exampleTrans]) => ({id,word,phonetic,meaning,module,example,exampleTrans}));

// ─── COLOR PALETTE for dynamic modules ───────────────────────────────────────
const BASE_MOD_COLORS = {
  '加密货币':'#f59e0b','股票金融':'#22c55e','金融政策':'#60a5fa',
  'AI行业':'#a78bfa','软件操作':'#34d399','通用':'#94a3b8',
  '开发工具':'#38bdf8','社交媒体':'#f472b6','电商平台':'#fb923c',
  '链上分析':'#4ade80'
};
const EXTRA_COLORS = ['#f472b6','#fb923c','#34d399','#e879f9','#22d3ee','#a3e635','#ff6b6b','#ffd93d'];
const getModColor = (mod, allMods) => {
  if (BASE_MOD_COLORS[mod]) return BASE_MOD_COLORS[mod];
  const extra = allMods.filter(m => !BASE_MOD_COLORS[m]);
  return EXTRA_COLORS[extra.indexOf(mod) % EXTRA_COLORS.length] || '#94a3b8';
};

// ─── STORAGE (localStorage first, window.storage fallback) ───────────────────
const store = {
  get: (key) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):null; } catch{ return null; } },
  set: (key, val) => { try { localStorage.setItem(key,JSON.stringify(val)); return true; } catch{ return false; } },
};

const shuffle = a => [...a].sort(() => Math.random() - .5);
const speak = t => { const u=new SpeechSynthesisUtterance(t); u.lang='en-US'; u.rate=0.85; speechSynthesis.cancel(); speechSynthesis.speak(u); };

// ─── CSV PARSER ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n').filter(l => l.trim());
  if (!lines.length) return [];
  // Detect header
  const firstLow = lines[0].toLowerCase();
  const hasHeader = firstLow.includes('单词') || firstLow.includes('word') || firstLow.includes('id');
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const parseRow = line => {
    const cells = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cells.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    cells.push(cur.trim());
    return cells.map(c => c.replace(/^"|"$/g,''));
  };

  return dataLines.map(line => {
    const c = parseRow(line);
    // Support formats: [id,word,phonetic,meaning,module,example,exampleTrans,status] or [word,phonetic,meaning,module,example,exampleTrans]
    if (c.length >= 7) {
      const offset = isNaN(Number(c[0])) ? 0 : 1; // skip id if numeric first col
      return { word:c[offset], phonetic:c[offset+1], meaning:c[offset+2], module:c[offset+3], example:c[offset+4], exampleTrans:c[offset+5] };
    }
    if (c.length === 6) return { word:c[0], phonetic:c[1], meaning:c[2], module:c[3], example:c[4], exampleTrans:c[5] };
    return null;
  }).filter(r => r && r.word && r.meaning);
}

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  bg:'#080c10', card:'#0d1520', border:'#1e2d3d',
  teal:'#64ffda', tealDim:'#0d3d2e',
  text:'#e2e8f0', muted:'#64748b',
  green:'#22c55e', greenDim:'#052e16',
  red:'#f87171', redDim:'#2d0a0a',
  amber:'#fbbf24',
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [vocab, setVocab] = useState(() => {
    const saved = store.get('yf_vocab');
    return saved ? saved : toVocab(DEFAULT_RAW);
  });
  const [wordSt, setWordSt] = useState(() => store.get('yf_wst') || {});
  const [sentSt, setSentSt] = useState(() => store.get('yf_sst') || {});
  const [selMods, setSelMods] = useState(() => {
    const saved = store.get('yf_mods');
    return saved || [...new Set(toVocab(DEFAULT_RAW).map(v=>v.module))];
  });
  const [storageOk] = useState(() => store.set('yf_test','1'));

  const [mode, setMode] = useState('unlearned'); // unlearned|learned|error
  const [pType, setPType] = useState('word'); // word|sentence
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('home');
  const [resetModal, setResetModal] = useState(null);
  const [wFilter, setWFilter] = useState('all');
  const [wSearch, setWSearch] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const fileRef = useRef();

  const allMods = [...new Set(vocab.map(v=>v.module))];

  // Save whenever state changes
  useEffect(() => { store.set('yf_wst', wordSt); }, [wordSt]);
  useEffect(() => { store.set('yf_sst', sentSt); }, [sentSt]);
  useEffect(() => { store.set('yf_mods', selMods); }, [selMods]);
  useEffect(() => { store.set('yf_vocab', vocab); }, [vocab]);

  // ── helpers ──
  const getStatus = (id, type) => (type==='sentence' ? sentSt : wordSt)[id] || 'unlearned';
  const setStatus = async (id, type, st) => {
    if (type==='sentence') setSentSt(p => ({...p,[id]:st}));
    else setWordSt(p => ({...p,[id]:st}));
  };

  const activeVocab = vocab.filter(v => selMods.includes(v.module));
  const pool = (m, t) => activeVocab.filter(v => getStatus(v.id,t) === m);

  const stats = () => {
    const wl = vocab.filter(v=>wordSt[v.id]==='learned').length;
    const we = vocab.filter(v=>wordSt[v.id]==='error').length;
    const sl = vocab.filter(v=>sentSt[v.id]==='learned').length;
    const se = vocab.filter(v=>sentSt[v.id]==='error').length;
    return {
      total: vocab.length,
      wordLearned:wl, wordError:we, wordUnlearned:vocab.length-wl-we,
      sentLearned:sl, sentError:se, sentUnlearned:vocab.length-sl-se,
      totalError: we+se,
    };
  };

  const genQ = (m, t) => {
    const p = pool(m, t);
    if (!p.length) { setQuestion(null); return; }
    const w = p[Math.floor(Math.random()*p.length)];
    const sameModule = vocab.filter(v=>v.id!==w.id && v.module===w.module);
    const otherModule = shuffle(vocab.filter(v=>v.id!==w.id && v.module!==w.module));
    const wrongPool = sameModule.length >= 3 ? sameModule : [...sameModule, ...otherModule];
    const wrong = shuffle(wrongPool).slice(0,3);
    const opts = t==='word'
      ? shuffle([{txt:w.meaning,ok:true},...wrong.map(x=>({txt:x.meaning,ok:false}))])
      : shuffle([{txt:w.exampleTrans,ok:true},...wrong.map(x=>({txt:x.exampleTrans,ok:false}))]);
    setQuestion({w,t,opts}); setSelected(null);
  };

  const startPractice = (m, t) => { setMode(m); setPType(t); setTab('practice'); genQ(m,t); };

  const handleAns = async opt => {
    if (selected!==null) return;
    setSelected(opt);
    if (opt.ok) { if (mode==='unlearned'||mode==='error') await setStatus(question.w.id, pType, 'learned'); }
    else await setStatus(question.w.id, pType, 'error');
  };

  const doReset = async type => {
    if (type==='word_all') { setWordSt({}); }
    else if (type==='sent_all') { setSentSt({}); }
    else if (type==='word_learned') { setWordSt(p=>{ const n={...p}; Object.keys(n).forEach(k=>{ if(n[k]==='learned') n[k]='unlearned'; }); return n; }); }
    else if (type==='sent_learned') { setSentSt(p=>{ const n={...p}; Object.keys(n).forEach(k=>{ if(n[k]==='learned') n[k]='unlearned'; }); return n; }); }
    setResetModal(null);
  };

  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const rows = parseCSV(ev.target.result);
      if (!rows.length) { setImportMsg('❌ 解析失败，请检查文件格式'); return; }
      const maxId = Math.max(...vocab.map(v=>v.id), 0);
      const existingWords = new Set(vocab.map(v=>v.word.toLowerCase()));
      const newRows = rows.filter(r => !existingWords.has(r.word.toLowerCase()));
      if (!newRows.length) { setImportMsg('⚠️ 所有词汇已存在，没有新词被导入'); return; }
      const newVocab = [...vocab, ...newRows.map((r,i)=>({...r, id:maxId+i+1}))];
      setVocab(newVocab);
      // Add new modules to selMods
      const newMods = [...new Set(newRows.map(r=>r.module))].filter(m=>!selMods.includes(m));
      if (newMods.length) setSelMods(p=>[...p,...newMods]);
      setImportMsg(`✅ 成功导入 ${newRows.length} 个新词汇${newMods.length?`，新增模块：${newMods.join('、')}`:''}`);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  const exportCSV = () => {
    const lbl = (id,t) => { const s=getStatus(id,t); return s==='learned'?'已学习':s==='error'?'错题':'未学习'; };
    const rows = vocab.map(v=>`${v.id},"${v.word}","${v.phonetic}","${v.meaning}","${v.module}","${v.example}","${v.exampleTrans}","${lbl(v.id,'word')}","${lbl(v.id,'sentence')}"`);
    const b = new Blob(['\ufeffID,单词,音标,意思,模块,例句,例句翻译,单词状态,例句状态\n'+rows.join('\n')],{type:'text/csv;charset=utf-8'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(b); a.download='渔夫英语词库.csv'; a.click();
  };

  const st = stats();
  const curPool = pool(mode, pType);

  const SaveBadge = () => storageOk ? null : (
    <div style={{background:'#2d1a0a',border:'1px solid #f97316',borderRadius:8,padding:'8px 14px',marginBottom:12,fontSize:12,color:'#fb923c'}}>
      ⚠️ 存储受限，记录仅本次有效。部署到服务器后可永久保存。
    </div>
  );

  return (
    <div style={{maxWidth:480,margin:'0 auto',minHeight:'100vh',background:C.bg,color:C.text,fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      {/* Header */}
      <div style={{padding:'14px 16px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,background:C.bg,zIndex:10}}>
        <span style={{color:C.teal,fontWeight:800,fontSize:18}}>🎣 渔夫英语</span>
        <span style={{color:C.muted,fontSize:12}}>{vocab.length}词 · {selMods.length}/{allMods.length}模块</span>
      </div>

      <div style={{flex:1,overflowY:'auto',paddingBottom:80}}>

        {/* ══ HOME ══ */}
        {tab==='home' && (
          <div style={{padding:16}}>
            <SaveBadge />
            {/* 单词统计 */}
            <div style={{color:C.muted,fontSize:11,fontWeight:600,letterSpacing:1,marginBottom:8}}>📖 单词</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
              {[
                {label:'未学习',val:st.wordUnlearned,col:C.amber,bg:'rgba(251,191,36,0.08)'},
                {label:'已学习',val:st.wordLearned,col:C.green,bg:'rgba(34,197,94,0.08)'},
                {label:'错题',val:st.wordError,col:C.red,bg:'rgba(248,113,113,0.08)'},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,border:`1px solid ${s.col}33`,borderRadius:12,padding:'12px 8px',textAlign:'center'}}>
                  <div style={{color:s.col,fontSize:22,fontWeight:800}}>{s.val}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* 例句统计 */}
            <div style={{color:C.muted,fontSize:11,fontWeight:600,letterSpacing:1,marginBottom:8}}>📝 例句</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
              {[
                {label:'未练习',val:st.sentUnlearned,col:C.amber,bg:'rgba(251,191,36,0.08)'},
                {label:'已掌握',val:st.sentLearned,col:C.green,bg:'rgba(34,197,94,0.08)'},
                {label:'错题',val:st.sentError,col:C.red,bg:'rgba(248,113,113,0.08)'},
              ].map(s=>(
                <div key={s.label} style={{background:s.bg,border:`1px solid ${s.col}33`,borderRadius:12,padding:'12px 8px',textAlign:'center'}}>
                  <div style={{color:s.col,fontSize:22,fontWeight:800}}>{s.val}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* 总错题 */}
            <div style={{background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.3)',borderRadius:12,padding:'10px 16px',marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:C.muted,fontSize:13}}>总错题数（单词+例句）</span>
              <span style={{color:C.red,fontWeight:800,fontSize:20}}>{st.totalError}</span>
            </div>

            {/* 练习入口 */}
            <div style={{color:C.muted,fontSize:11,fontWeight:600,letterSpacing:1,marginBottom:10}}>快速开始</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
              {[
                {m:'unlearned',t:'word',label:'练习新词',sub:`${st.wordUnlearned}个未学`,icon:'📖',col:C.amber},
                {m:'error',t:'word',label:'单词错题',sub:`${st.wordError}个错题`,icon:'🔥',col:C.red},
                {m:'unlearned',t:'sentence',label:'练习例句',sub:`${st.sentUnlearned}个未练`,icon:'📝',col:C.teal},
                {m:'error',t:'sentence',label:'例句错题',sub:`${st.sentError}个错题`,icon:'⚡',col:'#f472b6'},
              ].map((item,i)=>(
                <button key={i} onClick={()=>startPractice(item.m,item.t)}
                  style={{background:C.card,border:`1px solid ${item.col}44`,borderRadius:14,padding:'14px 12px',cursor:'pointer',textAlign:'left'}}>
                  <div style={{fontSize:22,marginBottom:5}}>{item.icon}</div>
                  <div style={{color:item.col,fontWeight:700,fontSize:14}}>{item.label}</div>
                  <div style={{color:C.muted,fontSize:11,marginTop:2}}>{item.sub}</div>
                </button>
              ))}
            </div>

            {/* 进度条 */}
            <div style={{background:C.card,borderRadius:12,padding:14,border:`1px solid ${C.border}`}}>
              {allMods.map(mod=>{
                const total = vocab.filter(v=>v.module===mod).length;
                const learned = vocab.filter(v=>v.module===mod&&wordSt[v.id]==='learned').length;
                const col = getModColor(mod, allMods);
                const inactive = !selMods.includes(mod);
                return (
                  <div key={mod} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,opacity:inactive?0.4:1}}>
                    <div style={{width:7,height:7,borderRadius:'50%',background:col,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                        <span style={{fontSize:12,color:C.text}}>{mod}{inactive?' (未选)':''}</span>
                        <span style={{fontSize:11,color:C.muted}}>{learned}/{total}</span>
                      </div>
                      <div style={{background:C.bg,borderRadius:999,height:4}}>
                        <div style={{width:`${total?learned/total*100:0}%`,background:col,height:'100%',borderRadius:999}}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ PRACTICE ══ */}
        {tab==='practice' && (
          <div style={{padding:16}}>
            {/* Mode + type selector */}
            <div style={{display:'flex',gap:6,marginBottom:12,overflowX:'auto',paddingBottom:2}}>
              {[['unlearned','新词','📖',C.amber],['error','错题','🔥',C.red],['learned','复习','💪',C.green]].map(([m,l,ic,col])=>(
                <button key={m} onClick={()=>{setMode(m);genQ(m,pType);}}
                  style={{flexShrink:0,padding:'7px 12px',border:`1px solid ${mode===m?col:C.border}`,background:mode===m?col+'22':C.card,color:mode===m?col:C.muted,borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600,whiteSpace:'nowrap'}}>
                  {ic} {l}
                </button>
              ))}
              <button onClick={()=>setPType(p=>{const n=p==='word'?'sentence':'word';genQ(mode,n);return n;})}
                style={{flexShrink:0,padding:'7px 12px',border:`1px solid ${pType==='sentence'?'#f472b6':C.teal}44`,background:pType==='sentence'?'rgba(244,114,182,0.1)':C.tealDim,color:pType==='sentence'?'#f472b6':C.teal,borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600,whiteSpace:'nowrap'}}>
                {pType==='word'?'📖 单词模式':'📝 例句模式'}
              </button>
            </div>

            {!question ? (
              <div style={{textAlign:'center',padding:'60px 20px'}}>
                <div style={{fontSize:48,marginBottom:16}}>🎉</div>
                <div style={{color:C.teal,fontSize:18,fontWeight:700,marginBottom:8}}>这个池子已清空！</div>
                <div style={{color:C.muted,fontSize:14,lineHeight:1.6}}>
                  {pool('unlearned',pType).length===0&&pool('error',pType).length===0
                    ?'全部练完了，去设置里重置开始新一轮'
                    :'切换模式继续练习'}
                </div>
              </div>
            ) : (
              <>
                <div style={{background:C.card,borderRadius:20,padding:22,border:`1px solid ${C.border}`,marginBottom:14}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                    <span style={{background:getModColor(question.w.module,allMods)+'22',color:getModColor(question.w.module,allMods),fontSize:11,padding:'3px 10px',borderRadius:20,fontWeight:600}}>
                      {question.w.module}
                    </span>
                    <span style={{color:C.muted,fontSize:12}}>{curPool.length}个待练</span>
                  </div>

                  {pType==='word' ? (
                    <>
                      <div style={{textAlign:'center',marginBottom:10}}>
                        <div style={{fontSize:30,fontWeight:800,letterSpacing:1}}>{question.w.word}</div>
                        <div style={{color:C.muted,fontSize:13,marginTop:4}}>{question.w.phonetic}</div>
                      </div>
                      <button onClick={()=>speak(question.w.word)}
                        style={{display:'block',margin:'0 auto 12px',background:C.tealDim,border:`1px solid ${C.teal}44`,color:C.teal,borderRadius:20,padding:'5px 16px',cursor:'pointer',fontSize:13}}>
                        🔊 朗读
                      </button>
                      {/* ① 例句 + 中文翻译（选完答案后才显示） */}
                      {selected!==null && (
                        <div style={{background:C.bg,borderRadius:10,padding:'10px 12px'}}>
                          <div style={{fontSize:13,color:C.text,lineHeight:1.6,marginBottom:4}}>
                            💬 {question.w.example}
                          </div>
                          <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>
                            {question.w.exampleTrans}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{color:C.muted,fontSize:12,marginBottom:8}}>这句话是什么意思？</div>
                      <div style={{background:C.bg,borderRadius:12,padding:14,fontSize:15,color:C.text,lineHeight:1.6,marginBottom:6}}>
                        "{question.w.example}"
                      </div>
                      <button onClick={()=>speak(question.w.example)}
                        style={{background:'none',border:'none',color:C.teal,fontSize:12,cursor:'pointer',padding:'2px 0'}}>
                        🔊 朗读例句
                      </button>
                    </>
                  )}
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {question.opts.map((opt,i)=>{
                    let bg=C.card, border=`1px solid ${C.border}`, color=C.text;
                    if (selected!==null) {
                      if(opt.ok){bg=C.greenDim;border=`1px solid ${C.green}`;color=C.green;}
                      else if(selected===opt){bg=C.redDim;border=`1px solid ${C.red}`;color=C.red;}
                    }
                    return (
                      <button key={i} onClick={()=>handleAns(opt)}
                        style={{background:bg,border,color,borderRadius:14,padding:'14px',fontSize:15,cursor:'pointer',textAlign:'left',lineHeight:1.4}}>
                        <span style={{color:C.muted,fontSize:12,marginRight:8}}>{'ABCD'[i]}.</span>
                        {opt.txt}
                        {selected!==null&&opt.ok&&<span style={{float:'right'}}>✓</span>}
                        {selected!==null&&selected===opt&&!opt.ok&&<span style={{float:'right',color:C.red}}>✗</span>}
                      </button>
                    );
                  })}
                </div>

                {selected!==null && (
                  <div style={{marginTop:14}}>
                    <div style={{background:selected.ok?C.greenDim:C.redDim,border:`1px solid ${selected.ok?C.green:C.red}`,borderRadius:14,padding:'12px 16px',marginBottom:12}}>
                      <div style={{color:selected.ok?C.green:C.red,fontWeight:700,marginBottom:4}}>
                        {selected.ok?'✓ 正确！':'✗ 答错了'}
                      </div>
                      {!selected.ok&&(
                        <div style={{fontSize:14,marginBottom:4}}>
                          正确答案：<span style={{color:C.green,fontWeight:600}}>{pType==='word'?question.w.meaning:question.w.exampleTrans}</span>
                        </div>
                      )}
                      <div style={{color:C.muted,fontSize:13}}>
                        {pType==='word'
                          ? <><b style={{color:C.text}}>{question.w.word}</b> · {question.w.phonetic}</>
                          : <><b style={{color:C.text}}>{question.w.word}</b> — {question.w.meaning}</>}
                      </div>
                    </div>
                    <button onClick={()=>genQ(mode,pType)}
                      style={{background:C.teal,color:C.bg,border:'none',borderRadius:14,padding:'13px',fontSize:16,fontWeight:600,cursor:'pointer',width:'100%'}}>
                      下一题 →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ══ WORDS ══ */}
        {tab==='words' && (
          <div style={{padding:16}}>
            <div style={{display:'flex',gap:6,marginBottom:10,overflowX:'auto',paddingBottom:2}}>
              {[['all','全部',C.muted],['unlearned','未学',C.amber],['learned','已学',C.green],['error','单词错题',C.red],['sent_error','例句错题','#f472b6']].map(([f,l,col])=>(
                <button key={f} onClick={()=>setWFilter(f)}
                  style={{flexShrink:0,padding:'6px 12px',border:`1px solid ${wFilter===f?col:C.border}`,background:wFilter===f?col+'22':C.card,color:wFilter===f?col:C.muted,borderRadius:20,cursor:'pointer',fontSize:12,fontWeight:600,whiteSpace:'nowrap'}}>
                  {l}
                </button>
              ))}
            </div>
            <input style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,borderRadius:10,padding:'10px 14px',fontSize:14,width:'100%',outline:'none',boxSizing:'border-box',marginBottom:10}}
              placeholder="搜索单词或中文..." value={wSearch} onChange={e=>setWSearch(e.target.value)}/>
            {vocab.filter(v=>{
              const ws=wordSt[v.id]||'unlearned', ss=sentSt[v.id]||'unlearned';
              const fOk = wFilter==='all'||wFilter===ws||(wFilter==='sent_error'&&ss==='error');
              const sOk = !wSearch||v.word.toLowerCase().includes(wSearch.toLowerCase())||v.meaning.includes(wSearch);
              return fOk&&sOk;
            }).map(v=>{
              const ws=wordSt[v.id]||'unlearned', ss=sentSt[v.id]||'unlearned';
              const wCol={learned:C.green,error:C.red,unlearned:C.muted}[ws];
              const sCol={learned:C.green,error:'#f472b6',unlearned:C.muted}[ss];
              return (
                <div key={v.id} style={{background:C.card,borderRadius:12,padding:'12px 14px',marginBottom:8,border:`1px solid ${C.border}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontWeight:700,fontSize:15}}>{v.word}</span>
                      <button onClick={()=>speak(v.word)} style={{background:'none',border:'none',color:C.teal,cursor:'pointer',fontSize:14,padding:0}}>🔊</button>
                    </div>
                    <div style={{display:'flex',gap:4}}>
                      <span style={{color:wCol,fontSize:10,background:wCol+'22',padding:'2px 6px',borderRadius:8}}>词:{ws==='learned'?'已学':ws==='error'?'错':'未'}</span>
                      <span style={{color:sCol,fontSize:10,background:sCol+'22',padding:'2px 6px',borderRadius:8}}>句:{ss==='learned'?'已学':ss==='error'?'错':'未'}</span>
                    </div>
                  </div>
                  <div style={{color:C.muted,fontSize:12,marginBottom:4}}>{v.phonetic}</div>
                  <div style={{color:C.text,fontSize:14,marginBottom:6}}>{v.meaning}</div>
                  <div style={{background:C.bg,borderRadius:8,padding:'8px 10px'}}>
                    <div style={{color:C.text,fontSize:12,lineHeight:1.6}}>💬 {v.example}</div>
                    <div style={{color:C.muted,fontSize:11,marginTop:3}}>{v.exampleTrans}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ SETTINGS ══ */}
        {tab==='settings' && (
          <div style={{padding:16}}>
            <SaveBadge />

            {/* ③ 模块筛选 */}
            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
              <div style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:4}}>练习模块筛选</div>
              <div style={{color:C.muted,fontSize:12,marginBottom:14}}>只勾选的模块会出现在练习中</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:12}}>
                {allMods.map(mod=>{
                  const col = getModColor(mod, allMods);
                  const active = selMods.includes(mod);
                  const count = vocab.filter(v=>v.module===mod).length;
                  return (
                    <button key={mod} onClick={()=>setSelMods(p=>active?p.filter(m=>m!==mod):[...p,mod])}
                      style={{padding:'7px 14px',border:`1px solid ${active?col:C.border}`,background:active?col+'22':C.card,color:active?col:C.muted,borderRadius:20,cursor:'pointer',fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:active?col:C.muted,display:'inline-block',flexShrink:0}}/>
                      {mod} ({count})
                    </button>
                  );
                })}
              </div>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setSelMods(allMods)} style={{flex:1,background:C.tealDim,border:`1px solid ${C.teal}44`,color:C.teal,borderRadius:8,padding:'8px',cursor:'pointer',fontSize:12,fontWeight:600}}>全选</button>
                <button onClick={()=>setSelMods([])} style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:'8px',cursor:'pointer',fontSize:12}}>全不选</button>
              </div>
            </div>

            {/* ② 导入词库 */}
            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}>
              <div style={{color:C.text,fontWeight:700,fontSize:14,marginBottom:4}}>导入词库</div>
              <div style={{color:C.muted,fontSize:12,marginBottom:4}}>支持CSV格式，列顺序：单词, 音标, 意思, 模块, 例句, 例句翻译</div>
              <div style={{color:C.muted,fontSize:11,marginBottom:12}}>也支持导出的CSV格式（含ID和状态列）</div>
              <input ref={fileRef} type="file" accept=".csv,.txt" onChange={handleImport} style={{display:'none'}}/>
              <button onClick={()=>fileRef.current.click()}
                style={{background:C.tealDim,border:`1px solid ${C.teal}44`,color:C.teal,borderRadius:8,padding:'10px',cursor:'pointer',fontSize:14,fontWeight:600,width:'100%'}}>
                📂 选择CSV文件导入
              </button>
              {importMsg && (
                <div style={{marginTop:10,padding:'8px 12px',background:importMsg.startsWith('✅')?C.greenDim:importMsg.startsWith('⚠️')?'rgba(251,191,36,0.1)':C.redDim,borderRadius:8,fontSize:12,color:importMsg.startsWith('✅')?C.green:importMsg.startsWith('⚠️')?C.amber:C.red}}>
                  {importMsg}
                </div>
              )}
            </div>

            {/* 重置 & 导出 */}
            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:16}}>
              {[
                {label:'导出词库+进度',sub:'导出全部词汇及学习状态CSV',btn:'📥 导出',col:C.teal,bg:C.tealDim,action:exportCSV},
                {label:'重置单词进度（已学→未学）',sub:'单词错题不受影响',btn:'🔄',col:C.amber,bg:'rgba(251,191,36,0.1)',action:()=>setResetModal('word_learned')},
                {label:'重置例句进度（已学→未学）',sub:'例句错题不受影响',btn:'🔄',col:C.amber,bg:'rgba(251,191,36,0.1)',action:()=>setResetModal('sent_learned')},
                {label:'清空单词全部进度',sub:'单词恢复未学习',btn:'🗑️',col:C.red,bg:C.redDim,action:()=>setResetModal('word_all')},
                {label:'清空例句全部进度',sub:'例句恢复未练习',btn:'🗑️',col:C.red,bg:C.redDim,action:()=>setResetModal('sent_all')},
              ].map((item,i,arr)=>(
                <div key={i} style={{padding:'12px 16px',borderBottom:i<arr.length-1?`1px solid ${C.border}`:'none',display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
                  <div>
                    <div style={{color:C.text,fontSize:13,fontWeight:600}}>{item.label}</div>
                    <div style={{color:C.muted,fontSize:11,marginTop:1}}>{item.sub}</div>
                  </div>
                  <button onClick={item.action}
                    style={{flexShrink:0,background:item.bg,border:`1px solid ${item.col}44`,color:item.col,borderRadius:8,padding:'7px 14px',cursor:'pointer',fontSize:13,fontWeight:600}}>
                    {item.btn}
                  </button>
                </div>
              ))}
            </div>

            {/* 进度总览 */}
            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:16}}>
              <div style={{color:C.muted,fontSize:11,fontWeight:600,marginBottom:10,letterSpacing:1}}>进度总览</div>
              {[
                {l:'总词汇',v:st.total,c:C.teal},
                {l:'单词已学',v:st.wordLearned,c:C.green},
                {l:'单词错题',v:st.wordError,c:C.red},
                {l:'例句已学',v:st.sentLearned,c:C.green},
                {l:'例句错题',v:st.sentError,c:'#f472b6'},
                {l:'总错题',v:st.totalError,c:C.red},
              ].map(s=>(
                <div key={s.l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.muted,fontSize:13}}>{s.l}</span>
                  <span style={{color:s.c,fontWeight:700}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:C.card,borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-around',padding:'8px 0',zIndex:10}}>
        {[['home','🏠','主页'],['practice','⚡','练习'],['words','📚','词库'],['settings','⚙️','设置']].map(([t,ic,lb])=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{background:'none',border:'none',color:tab===t?C.teal:C.muted,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,fontSize:11,padding:'4px 16px',fontWeight:tab===t?700:400}}>
            <span style={{fontSize:20}}>{ic}</span>{lb}
          </button>
        ))}
      </div>

      {/* Reset Modal */}
      {resetModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:100,padding:'0 0 20px'}}>
          <div style={{background:C.card,borderRadius:'20px 20px 16px 16px',padding:24,width:'100%',maxWidth:480,border:`1px solid ${C.border}`}}>
            <div style={{color:C.text,fontWeight:700,fontSize:16,marginBottom:8}}>
              {resetModal.includes('all')?'⚠️ 确认清空':'🔄 确认重置'}
            </div>
            <div style={{color:C.muted,fontSize:14,marginBottom:20}}>
              {resetModal==='word_all'?'单词所有进度将清空':resetModal==='sent_all'?'例句所有进度将清空':resetModal==='word_learned'?'已学习的单词回到未学习，错题不变':'已掌握的例句回到未练习，错题不变'}
            </div>
            <div style={{display:'flex',gap:12}}>
              <button onClick={()=>setResetModal(null)} style={{flex:1,background:C.bg,color:C.muted,border:`1px solid ${C.border}`,borderRadius:12,padding:'12px',cursor:'pointer',fontSize:15}}>取消</button>
              <button onClick={()=>doReset(resetModal)} style={{flex:1,background:resetModal.includes('all')?C.red:C.amber,color:C.bg,border:'none',borderRadius:12,padding:'12px',fontSize:15,fontWeight:600,cursor:'pointer'}}>确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
