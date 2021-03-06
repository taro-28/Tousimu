// 共通関数
window.functionLib = window.functionLib || {};

$('[data-toggle="tooltip"]').tooltip();

$('#ss-picture1').hover(make_ss1);
$('#ss-picture1').click(make_ss1);

$('#ss-picture2').hover(make_ss2);
$('#ss-picture2').click(make_ss2);

$('#ss-picture3').hover(make_ss3);
$('#ss-picture3').click(make_ss3);

$('#ss-picture4').hover(make_ss4);
$('#ss-picture4').click(make_ss4);


function make_ss1() {
  html2canvas(document.querySelector('#ss-target1'), {
    // スクロールした時のズレを修正
    scrollX: 0,
    scrollY: -window.scrollY
  }).then(canvas => {
    var picture = canvas.toDataURL();
    document.getElementById('ss-picture1').setAttribute("href", picture);
  });
}

function make_ss2() {
  html2canvas(document.querySelector('#ss-target2'), {
    // スクロールした時のズレを修正
    scrollX: 0,
    scrollY: -window.scrollY
  }).then(canvas => {
    var picture = canvas.toDataURL();
    document.getElementById('ss-picture2').setAttribute("href", picture);
  });
}

function make_ss3() {
  html2canvas(document.querySelector('#ss-target3'), {
    // スクロールした時のズレを修正
    scrollX: 0,
    scrollY: -window.scrollY
  }).then(canvas => {
    var picture = canvas.toDataURL();
    document.getElementById('ss-picture3').setAttribute("href", picture);
  });
}

function make_ss4() {
  html2canvas(document.querySelector('#ss-target4'), {
    // スクロールした時のズレを修正
    scrollX: 0,
    scrollY: -window.scrollY
  }).then(canvas => {
    var picture = canvas.toDataURL();
    document.getElementById('ss-picture4').setAttribute("href", picture);
  });
}
// SNSのシェアボタンを作成
function make_share_button(sns, text, ref_url) {
  if (sns == 'line') {
    var sns_url = 'timeline.line.me/social-plugin/share?url=';
    var sns_text = 'LINE';
  }
  else if (sns == 'facebook') {
    var sns_url = 'www.facebook.com/share.php?u=';
    var sns_text = 'Facebook';
  }
  else {
    var sns_url = 'twitter.com/share?url=';
    var sns_text = 'Tweet';
  }
  return $('.' + sns + '_share').html('<a href="https://' + sns_url + 'https://tousimu.work/' + ref_url + '&text=' + encodeURI(text) + '" rel="nofollow" target="_blank" class="btn ' + sns + ' rounded-pill btn-sm"><i class="fab fa-' + sns + '"></i> ' + sns_text + '</a>');
};
window.functionLib.make_share_button = make_share_button;
