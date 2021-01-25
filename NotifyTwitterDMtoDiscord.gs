function notifyTwitterDMtoDiscord() {
  // Gmailにて"TwitterDM"というラベルを作成し、TwitterDM通知に自動でラベル付けするようあらかじめ設定しておく。
  // "TwitterDM" のラベルがついたメールのうち、最新のメールが未読ならそれを通知するというプログラム。
  // 1分毎に走るように設定することを想定して書いたが、1分に2通以上新規DMが来ると取得漏れするので要改善です
  // 検索条件を「ラベルがTwitterDMかつ未読」にすれば解決するのかな？
  
  var threads = GmailApp.search('label:TwitterDM');
  var message = threads[0].getMessages()[0];
  var body = message.getBody().replace(/[\n\r]/g,"");
  var myRegexp = /<td class="preheader" style="padding:0;margin:0;line-height:1px;font-size:1px;font-size:1px;color:#ffffff;">([\s\S]*?)<d><\/d><\/td>/;

  /*
  HTMLメールで欲しい部分を抜き出すための正規表現。欲しい部分：
  <td class="preheader" style="padding:0;margin:0;line-height:1px;font-size:1px;font-size:1px;color:#ffffff;">
  ツイッターID: DM本文
  <d>
  </d>
  </td>
  */
  
  var text = body.match(myRegexp)[1];
  
  if(message.isUnread()){
    sendToDiscord(text);
    message.markRead();
  }
  

}

// 以下はDiscordにWebhookで投げるためのコード。
// 'YOUR-DISCORD-WEBHOOK-URL' にはあらかじめDiscord上で作成したWebhookのURLを入力してください。

function sendToDiscord(text){
  Logger.log(text);
  var url = 'YOUR-DISCORD-WEBHOOK-URL';
  
  // メッセージの内容です。DiscordのBot名や通知メッセージを編集可能。
  const payload = {
    username: "ツイノオタクBot",
    content: "DMが届きました\n> " + text,
  };
  
  var params = {
    'method': 'post',
    'headers': { 'Content-type': 'application/json' },
    'payload': JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, params);
  
}
