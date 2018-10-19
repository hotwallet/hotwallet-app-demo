var HotWallet = window.HotWallet

HotWallet.getTransactions()
  .then(function (transactions) {
    var html = [
      '<div style="padding: 25px">',
      '  <p>You have ' + transactions.length + ' transactions.</p>',
      '  <button onclick="document.getElementById(\'h1\').innerHTML = document.getElementById(\'h1\').innerHTML + \'<div style=height:200>.</div>\'">Button</button>',
      '</div>'
    ].join('\n')

    var existingHTML = document.getElementsByTagName('main')[0].innerHTML
    document.getElementsByTagName('main')[0].innerHTML = existingHTML + html
  })

HotWallet.rpc('getBalances').then(function (balances) {
  console.log('balances:', balances)
})

try {
  console.log(window.parent.document)
  console.log('Oh no! Iframe has access to parent window.')
} catch (err) {
  console.log('Iframe is sandboxed.')
}
