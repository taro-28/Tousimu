cal_draw_last_funded_amount();

function param_check(monthly_amount = 100000, period = 20, yearly_yield = 1, last_funded_amount = 1000000) {
    if (period <= 0 || period > 80) {
        return $('.result').html('投資期間は<br class="d-inline d-sm-none">1~80の整数で入力して下さい！');
    } else if (0 > yearly_yield || yearly_yield > 99.9) {
        return $('.result').html('利回りは<br class="d-inline d-sm-none">0~99.9の数値で入力して下さい！');
    } else if (monthly_amount < 1000 || monthly_amount > 9999999) {
        return $('.result').html('毎月の投資金額は<br class="d-inline d-sm-none">1,000~9,999,999円の整数で入力して下さい！');
    } else if (last_funded_amount < 1000000 || last_funded_amount > 999999999) {
        return $('.result').html('最終積立金額は<br class="d-inline d-sm-none">1,000,000~999,999,999円の整数で入力して下さい！');
    } else {
        return false;
    }
}

function cal_draw_last_funded_amount() {
    var period = $('#id_last_funded_period')[0].value
    var yearly_yield = $('#id_last_funded_yearly_yield')[0].value
    var monthly_amount = $('#id_last_funded_monthly_amount')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals, last_funded_amount] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals, last_funded_amount] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('最終積立金額<br class="d-inline d-sm-none">' + last_funded_amount + '円');
        var sns_text = '毎月' + Number(monthly_amount).toLocaleString() + '円投資し、利回り' + Math.round(yearly_yield * 10) / 10 + '%で運用すると、' + period + '年後の最終積立金額は' + last_funded_amount + '円になります。';
        window.functionLib.make_share_button('twitter', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('line', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'funded-simulator');
        drawlinechart(periods, funded_amounts, principals, 'id_first_tab_radar_chart');
    }
}

function cal_draw_monthly_amount() {
    var period = $('#id_monthly_amount_period')[0].value
    var yearly_yield = $('#id_monthly_amount_yearly_yield')[0].value
    var last_funded_amount = $('#id_monthly_amount_last_funded_amount')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var monthly_amount = cal_monthly_amount(period, yearly_yield, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('毎月の投資額<br class="d-inline d-sm-none">' + Math.round(monthly_amount).toLocaleString() + '円');
        var sns_text = period + '年間、' + '利回り' + Math.round(yearly_yield * 10) / 10 + '%で運用し、最終積立金額' + Number(last_funded_amount).toLocaleString() + '円を達成するには、毎月' + Math.round(monthly_amount).toLocaleString() + '円投資する必要があります。';
        window.functionLib.make_share_button('twitter', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('line', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'funded-simulator');
        drawlinechart(periods, funded_amounts, principals, 'id_second_tab_radar_chart');
    }
}

function cal_draw_period() {
    var monthly_amount = $('#id_period_monthly_amount')[0].value
    var yearly_yield = $('#id_period_yearly_yield')[0].value
    var last_funded_amount = $('#id_period_last_funded_amount')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var period = cal_period(monthly_amount, yearly_yield, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('投資期間<br class="d-inline d-sm-none">' + Math.round(period).toLocaleString() + '年');
        var sns_text = '毎月' + Math.round(monthly_amount).toLocaleString() + '円投資し、利回り' + Math.round(yearly_yield * 10) / 10 + '%で運用して、最終積立金額' + Number(last_funded_amount).toLocaleString() + '円を達成するのに必要な投資期間は' + period + '年です。';
        window.functionLib.make_share_button('twitter', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('line', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'funded-simulator');
        drawlinechart(periods, funded_amounts, principals, 'id_third_tab_radar_chart');
    }
}

function cal_draw_yearly_yield() {
    var monthly_amount = $('#id_yearly_yield_monthly_amount')[0].value
    var period = $('#id_yearly_yield_period')[0].value
    var last_funded_amount = $('#id_yearly_yield_last_funded_amount')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var yearly_yield = cal_yearly_yield(monthly_amount, period, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('利回り<br class="d-inline d-sm-none">' + Math.round(yearly_yield * 10) / 10 + '%');
        var sns_text = period + '年間、毎月' + Math.round(monthly_amount).toLocaleString() + '円投資し、最終積立金額' + Number(last_funded_amount).toLocaleString() + '円を達成するのに必要な利回りは' + Math.round(yearly_yield * 10) / 10 + '%です。';
        window.functionLib.make_share_button('twitter', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('line', sns_text, 'funded-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'funded-simulator');
        drawlinechart(periods, funded_amounts, principals, 'id_forth_tab_radar_chart');
    }
}

// 初期表示：最終積立額
$('#id_first_tab').click(cal_draw_last_funded_amount);

// 初期表示：毎月の積立額
$('#id_second_tab').click(cal_draw_monthly_amount);

// 初期表示：積立期間
$('#id_third_tab').click(cal_draw_period);

// 初期表示：期待利回り
$('#id_forth_tab').click(cal_draw_yearly_yield);

// 再描画：最終積立額
$('#id_last_funded_period,#id_last_funded_yearly_yield, #id_last_funded_monthly_amount')
    .on('input', cal_draw_last_funded_amount);

// 再描画：毎月の積立額
$('#id_monthly_amount_period, #id_monthly_amount_yearly_yield, #id_monthly_amount_last_funded_amount')
    .on('input', cal_draw_monthly_amount);

// 再描画：積立期間
$('#id_period_monthly_amount, #id_period_yearly_yield, #id_period_last_funded_amount')
    .on('input', cal_draw_period);

// 再描画：期待利回り
$('#id_yearly_yield_monthly_amount, #id_yearly_yield_period, #id_yearly_yield_last_funded_amount')
    .on('input', cal_draw_yearly_yield);

// 最終積立額と各年の額を計算
function cal_last_funded_amount(period, yearly_yield, monthly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, funded_amount] = [[], [], [], 0];

    // 投資元本と期間
    for (let i = 0; i < 13; i++) {
        principals.push(Math.round(i * period * monthly_amount / 10000))
        var res = ''
        if (Math.floor(period * i / 12) != 0) {
            res = String(Math.floor(period * i / 12)) + '年'
        }
        if (Math.floor(period * i % 12) != 0) {
            res = res + String(Math.floor(period * i % 12)) + 'ヶ月'
        }
        var new_length2 = periods.push(res + '後')
    }
    // 原点の期間を削除
    periods[0] = ""

    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % period == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
        }
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    // 最終積立額を追加
    funded_amounts.push(Math.round(funded_amount / 10000))

    // 表示用最終積立額
    var last_funded_amount = Math.round(funded_amount).toLocaleString();

    return [periods, funded_amounts, principals, last_funded_amount];
}

// 最終積立額と各年の額を計算
function cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, funded_amount] = [[], [], [], 0];

    // 投資元本と期間
    for (let i = 0; i < 4; i++) {
        principals.push(Math.round(i * period * 4 * monthly_amount / 10000))
        var res = ''
        if (Math.floor(period * i / 12) != 0) {
            res = String(Math.floor(period * 4 * i / 12)) + '年'
        }
        if (Math.floor(period * i % 12) != 0) {
            res = res + String(Math.floor(period * 4 * i % 12)) + 'ヶ月'
        }
        periods.push(res + '後')
    }
    // 原点の期間を削除
    periods[0] = ""

    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % (period * 4) == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
        }
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    // 最終積立額を追加
    funded_amounts.push(Math.round(funded_amount / 10000))

    // 表示用最終積立額
    var last_funded_amount = Math.round(funded_amount).toLocaleString();

    return [periods, funded_amounts, principals, last_funded_amount];
}

// 最終積立額のみを計算
function cal_simple_last_funded_amount(period, yearly_yield, monthly_amount) {
    // 変数定義
    var funded_amount = 0;
    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    return funded_amount;
}

// 最大の位が1で残りは0の整数を生成
function paddingright(n) {
    var one = '1';
    for (let i = 0; i < n; i++) {
        one += '0'
    }
    return Number(one);
};

// 毎月積立額を計算
function cal_monthly_amount(period, yearly_yield, last_funded_amount) {
    if (yearly_yield == 0) {
        var init_monthly_amount = last_funded_amount / period / 12 + 0.01;
    } else {
        var init_monthly_amount = last_funded_amount / period / 12 / (1 + yearly_yield / 1200) + 0.01;
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(init_monthly_amount).length;

        // 桁を落としながら収束
        var sign = 1;
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_monthly_amount -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(period, yearly_yield, init_monthly_amount)
            }
            sign *= -1
        }
    }
    return init_monthly_amount;
}

// 積立期間を計算
function cal_period(monthly_amount, yearly_yield, last_funded_amount) {
    if (yearly_yield == 0) {
        var init_period = Math.round(last_funded_amount / monthly_amount / 12) + 0.01;
    } else {
        var init_period = last_funded_amount / monthly_amount / 12 / (1 + yearly_yield / 100) + 0.01;
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(Math.round(init_period)).length;

        // 桁を落としながら収束
        var sign = 1;
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_period -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(init_period, yearly_yield, monthly_amount)
            }
            sign *= -1
        }
        while (test_last_funded_amount * sign >= last_funded_amount * sign) {
            init_period -= 0.1 * sign;
            test_last_funded_amount = cal_simple_last_funded_amount(init_period, yearly_yield, monthly_amount)
        }
        sign *= -1
    }
    return Math.round(init_period);
}

// 毎月配当利回りを計算
function cal_yearly_yield(monthly_amount, period, last_funded_amount) {
    var init_yearly_yield = last_funded_amount / monthly_amount / period / 12 - 1 + 0.01;
    if (init_yearly_yield != 0) {
        if (init_yearly_yield > 0) {
            var sign = 1;
        } else {
            var sign = -1;
        }
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(Math.round(init_yearly_yield)).length;

        // 桁を落としながら収束
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_yearly_yield -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(period, init_yearly_yield, monthly_amount)
            }
            sign *= -1
        }
        while (test_last_funded_amount * sign >= last_funded_amount * sign) {
            init_yearly_yield -= 0.1 * sign;
            test_last_funded_amount = cal_simple_last_funded_amount(period, init_yearly_yield, monthly_amount)
        }
    }
    return init_yearly_yield;
}

function drawlinechart(periods, funded_amounts, principals, draw_chart) {

    if (typeof chart !== 'undefined' && chart) {
        chart.destroy();
    }
    Chart.defaults.global.defaultFontSize = 14;

    Chart.Legend.prototype.afterFit = function () {
        this.height = this.height + 10;
    };

    /* idが"radar-chart"の要素を取得 */
    var ctx = document.getElementById(draw_chart).getContext('2d');

    window.chart = new Chart(ctx, {
        // 線グラフ
        type: 'line',

        plugins: [ChartDataLabels],

        // データセットのデータ
        data: {
            labels: periods,
            datasets: [{
                label: '積立金額',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(233,82,149)',
                data: funded_amounts,
                datalabels: {
                    color: 'rgba(233,82,149)',
                    anchor: 'end',
                    align: 225,
                }
            },
            {
                label: '投資元本',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(135,162,219)',
                data: principals,
                datalabels: {
                    color: 'rgba(135,162,219)',
                    anchor: 'start',
                    align: 125,
                }
            },
            ]
        },

        // ここに設定オプションを書きます
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'x'
            },
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        if (value > 0) {
                            return value + '万円'
                        } else {
                            return null
                        }
                    },
                    align: 'left',
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        padding: 20
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '万円';
                        }
                    }
                }]
            }
        }
    });
}
