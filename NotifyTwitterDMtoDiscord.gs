function notifyTwitterDMtoDiscord() {
  // TwitterDMラベルのスレッドを取得
  var threads = GmailApp.search('label:TwitterDM');
  var message = threads[0].getMessages()[0];
  var body = message.getBody().replace(/[\n\r]/g,"");
  var myRegexp = /<td class="preheader" style="padding:0;margin:0;line-height:1px;font-size:1px;font-size:1px;color:#ffffff;">([\s\S]*?)<d><\/d><\/td>/;
  var text = body.match(myRegexp)[1];
  
  if(message.isUnread()){
    sendToDiscord(text);
    message.markRead();
  }
  
  /*
  取得したい部分：
  <td class="preheader" style="padding:0;margin:0;line-height:1px;font-size:1px;font-size:1px;color:#ffffff;">
  @pfosakana: こんばんは！先ほど誤って申請したおさかなです お手数ですが削除をお願いいたします よろしくお願いします
  <d>
  </d>
  </td>
  */

}

function sendToDiscord(text){
  Logger.log(text);
  var url = 'YOUR-DISCORD-WEBHOOK-URL';
  
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
