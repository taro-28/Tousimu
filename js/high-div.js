cal_draw_last_dividend();

function param_check(monthly_amount = 100000, period = 20, yearly_yield = 1, increase_rate = 1, last_dividend = 10000) {
    if (period <= 0 || period > 80) {
        return $('.result').html('投資期間は<br class="d-inline d-sm-none">1~80の整数で入力して下さい！');
    } else if (0.1 > yearly_yield || yearly_yield > 99.9) {
        return $('.result').html('配当利回りは<br class="d-inline d-sm-none">0.1~99.9の数値で入力して下さい！');
    } else if (0 > increase_rate || increase_rate > 99.9) {
        return $('.result').html('増配率は<br class="d-inline d-sm-none">0~99.9の数値で入力して下さい！');
    } else if (monthly_amount < 1000 || monthly_amount > 9999999) {
        return $('.result').html('毎月の投資金額は<br class="d-inline d-sm-none">1,000~9,999,999の整数で入力して下さい！');
    } else if (last_dividend < 10000 || last_dividend > 99999999) {
        return $('.result').html('最終年間配当金額は<br class="d-inline d-sm-none">10,000~99,999,999の整数で入力して下さい！');
    } else {
        return false;
    }
}

function cal_draw_last_dividend() {
    var period = $('#id_last_dividend_period')[0].value
    var yearly_yield = $('#id_last_dividend_yearly_yield')[0].value
    var increase_rate = $('#id_last_dividend_increase_rate')[0].value
    var monthly_amount = $('#id_last_dividend_monthly_amount')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend);
    if (!param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend)) {
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, yields, inc_yields, last_dividend] = cal_last_dividend(period, yearly_yield, increase_rate, monthly_amount);
        }
        else {
            var [periods, yields, inc_yields, last_dividend] = cal_last_dividend_mobile(period, yearly_yield, increase_rate, monthly_amount);
        }
        $('.result').html('最終年間配当金額<br class="d-inline d-sm-none">' + last_dividend.toLocaleString() + '円');
        var sns_text = '毎月' + Number(monthly_amount).toLocaleString() + '円投資し、配当利回り' + yearly_yield + '%、増配率' + increase_rate + '%で運用すると、' + period + '年後の年間配当金額は' + last_dividend.toLocaleString() + '円になります。'
        window.functionLib.make_share_button('twitter', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('line', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'dividend-simulator');
        drawbarchart(periods, yields, inc_yields, 'id_first_tab_radar_chart');
    }
}

function cal_draw_monthly_amount() {
    var last_dividend = $('#id_monthly_amount_last_dividend')[0].value;
    var period = $('#id_monthly_amount_period')[0].value;
    var yearly_yield = $('#id_monthly_amount_yearly_yield')[0].value;
    var increase_rate = $('#id_monthly_amount_increase_rate')[0].value;
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend);
    if (!param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend)) {
        var monthly_amount = cal_monthly_amount(last_dividend, period, yearly_yield, increase_rate);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, yields, inc_yields] = cal_last_dividend(period, yearly_yield, increase_rate, monthly_amount);
        }
        else {
            var [periods, yields, inc_yields] = cal_last_dividend_mobile(period, yearly_yield, increase_rate, monthly_amount);
        }
        $('.result').html('毎月の投資額<br class="d-inline d-sm-none">' + Math.round(monthly_amount).toLocaleString() + '円');
        var sns_text = period + '年間、配当利回り' + yearly_yield + '%、増配率' + increase_rate + '%で運用し、年間配当金額' + Number(last_dividend).toLocaleString() + '円を達成するには、毎月' + Math.round(monthly_amount).toLocaleString() + '円の投資が必要です。';
        window.functionLib.make_share_button('twitter', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('line', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'dividend-simulator');
        drawbarchart(periods, yields, inc_yields, 'id_second_tab_radar_chart');
    }

}

function cal_draw_period() {
    var last_dividend = $('#id_period_last_dividend')[0].value;
    var monthly_amount = Number($('#id_period_monthly_amount')[0].value);
    var yearly_yield = $('#id_period_yearly_yield')[0].value;
    var increase_rate = $('#id_period_increase_rate')[0].value;
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend);
    if (!param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend)) {
        var period = cal_period(last_dividend, monthly_amount, yearly_yield, increase_rate);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, yields, inc_yields] = cal_last_dividend(period, yearly_yield, increase_rate, monthly_amount);
        }
        else {
            var [periods, yields, inc_yields] = cal_last_dividend_mobile(period, yearly_yield, increase_rate, monthly_amount);
        }
        $('.result').html('投資期間<br class="d-inline d-sm-none">' + Math.round(period).toLocaleString() + '年');
        var sns_text = '毎月' + monthly_amount.toLocaleString() + '円投資し、配当利回り' + yearly_yield + '%、増配率' + increase_rate + '%で運用して、年間配当金額' + Number(last_dividend).toLocaleString() + '円を達成するには' + Math.round(period).toLocaleString() + '年必要です。';
        window.functionLib.make_share_button('twitter', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('line', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'dividend-simulator');
        drawbarchart(periods, yields, inc_yields, 'id_third_tab_radar_chart');
    }
}

function cal_draw_yearly_yield() {
    var monthly_amount = Number($('#id_yearly_yield_monthly_amount')[0].value)
    var period = $('#id_yearly_yield_period')[0].value
    var last_dividend = $('#id_yearly_yield_last_dividend')[0].value
    var increase_rate = $('#id_yearly_yield_increase_rate')[0].value;
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend);
    if (!param_check(monthly_amount, period, yearly_yield, increase_rate, last_dividend)) {
        var yearly_yield = cal_yearly_yield(last_dividend, period, monthly_amount, increase_rate);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, yields, inc_yields] = cal_last_dividend(period, yearly_yield, increase_rate, monthly_amount);
        }
        else {
            var [periods, yields, inc_yields] = cal_last_dividend_mobile(period, yearly_yield, increase_rate, monthly_amount);
        }
        $('.result').html('配当利回り<br class="d-inline d-sm-none">' + Math.round(yearly_yield * 10) / 10 + '%');
        var sns_text = period + '年間、毎月' + monthly_amount.toLocaleString() + '円投資し、増配率' + increase_rate + '%で運用して、年間配当金額' + Number(last_dividend).toLocaleString() + '円を達成するのに必要な配当利回りは' + Math.round(yearly_yield * 10) / 10 + '%です。'
        window.functionLib.make_share_button('twitter', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('line', sns_text, 'dividend-simulator');
        window.functionLib.make_share_button('facebook', sns_text, 'dividend-simulator');
        drawbarchart(periods, yields, inc_yields, 'id_forth_tab_radar_chart');
    }
}

$('#id_first_tab').click(cal_draw_last_dividend)

// 初期表示：毎月の投資金額
$('#id_second_tab').click(cal_draw_monthly_amount)

// 初期表示：投資期間
$('#id_third_tab').click(cal_draw_period)

// 初期表示：配当利回り
$('#id_forth_tab').click(cal_draw_yearly_yield)

// 再描画：最終年間配当金額
$('#id_last_dividend_period, #id_last_dividend_yearly_yield, #id_last_dividend_increase_rate, #id_last_dividend_monthly_amount')
    .on('input', cal_draw_last_dividend);

// 再描画：毎月の投資金額
$('#id_monthly_amount_last_dividend, #id_monthly_amount_period, #id_monthly_amount_yearly_yield, #id_monthly_amount_increase_rate')
    .on('input', cal_draw_monthly_amount);

// 再描画：投資期間
$('#id_period_last_dividend, #id_period_monthly_amount, #id_period_yearly_yield, #id_period_increase_rate')
    .on('input', cal_draw_period);

// 再描画：配当利回り
$('#id_yearly_yield_monthly_amount, #id_yearly_yield_period, #id_yearly_yield_last_dividend, #id_yearly_yield_increase_rate')
    .on('input', cal_draw_yearly_yield);

// 最終投資金額と各年の金額を計算
function cal_last_dividend(period, yearly_yield, increase_rate, montly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, yields, inc_yields, funded_amount, inc_funded_amount, base_yearly_yield] = [
        [],
        [],
        [],
        [],
        [],
        0,
        0,
        yearly_yield
    ];

    // 投資元本と期間
    for (let i = 0; i < 13; i++) {
        principals.push(Math.round(i * period * montly_amount / 10000))
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
    periods.shift();

    // 増配なし年間配当金を計算
    for (let i = 0; i < period * 12; i++) {
        inc_funded_amount = inc_funded_amount * (1 + base_yearly_yield / 1200) + Number(montly_amount);
        if (i % period == 0) {
            yields.push(Math.floor(inc_funded_amount * base_yearly_yield / 1000000));
        }
    }
    yields.push(Math.floor(inc_funded_amount * base_yearly_yield / 1000000));
    yields.shift();

    // 増配あり年間配当金を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % period == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
            inc_yields.push(Math.round(funded_amount * yearly_yield / 1000000));
        }
        var pre_result = funded_amount
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(montly_amount);
        yearly_yield = (pre_result * yearly_yield * (1 + increase_rate / 1200) + (funded_amount - pre_result) * base_yearly_yield) / funded_amount
    }
    funded_amounts.push(Math.round(funded_amount / 10000))
    inc_yields.push(Math.round(funded_amount * yearly_yield / 1000000));
    inc_yields.shift();

    var last_dividend = Math.round(funded_amount * yearly_yield / 100);

    return [periods, yields, inc_yields, last_dividend];
}

// 最終投資金額と各年の金額を計算
function cal_last_dividend_mobile(period, yearly_yield, increase_rate, montly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, yields, inc_yields, funded_amount, inc_funded_amount, base_yearly_yield] = [
        [],
        [],
        [],
        [],
        [],
        0,
        0,
        yearly_yield
    ];

    // 投資元本と期間
    for (let i = 0; i < 4; i++) {
        principals.push(Math.round(i * period * montly_amount / 10000))
        var res = ''
        if (Math.floor(period * i / 12) != 0) {
            res = String(Math.floor(period * 4 * i / 12)) + '年'
        }
        if (Math.floor(period * i % 12) != 0) {
            res = res + String(Math.floor(period * 4 * i % 12)) + 'ヶ月'
        }
        var new_length2 = periods.push(res + '後')
    }
    // 原点の期間を削除
    periods.shift();

    // 増配なし年間配当金を計算
    for (let i = 0; i < period * 12; i++) {
        inc_funded_amount = inc_funded_amount * (1 + base_yearly_yield / 1200) + Number(montly_amount);
        if (i % (period * 4) == 0) {
            yields.push(Math.floor(inc_funded_amount * base_yearly_yield / 1000000));
        }
    }
    yields.push(Math.floor(inc_funded_amount * base_yearly_yield / 1000000));
    yields.shift();

    // 増配あり年間配当金を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % (period * 4) == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
            inc_yields.push(Math.round(funded_amount * yearly_yield / 1000000));
        }
        var pre_result = funded_amount
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(montly_amount);
        yearly_yield = (pre_result * yearly_yield * (1 + increase_rate / 1200) + (funded_amount - pre_result) * base_yearly_yield) / funded_amount
    }
    funded_amounts.push(Math.round(funded_amount / 10000))
    inc_yields.push(Math.round(funded_amount * yearly_yield / 1000000));
    inc_yields.shift();

    var last_dividend = Math.round(funded_amount * yearly_yield / 100);

    return [periods, yields, inc_yields, last_dividend];
}

// 最終投資金額のみを計算
function cal_simple_last_funded_amount(period, yearly_yield, monthly_amount) {
    // 変数定義
    var funded_amount = 0;
    // 投資金額を計算
    for (let i = 0; i < period * 12; i++) {
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    return funded_amount;
}

function cal_simple_last_dividend(period, yearly_yield, increase_rate, monthly_amount) {
    // 変数定義
    var [funded_amount, base_yearly_yield] = [
        0,
        yearly_yield
    ];

    // 増配あり年間配当金を計算
    for (let i = 0; i < period * 12; i++) {
        var pre_result = funded_amount;
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + monthly_amount;
        yearly_yield = (pre_result * yearly_yield * (1 + increase_rate / 1200) + (funded_amount - pre_result) * base_yearly_yield) / funded_amount
    }
    var last_dividend = Math.round(funded_amount * yearly_yield / 100);

    return last_dividend;
}

// 最大の位が1で残りは0の整数を生成
function paddingright(n) {
    var one = '1';
    for (let i = 0; i < n; i++) {
        one += '0'
    }
    return Number(one);
};

// 毎月投資金額を計算
function cal_monthly_amount(last_dividend, period, yearly_yield, increase_rate) {
    // 収束で0にならないように0.01ずらす
    var init_monthly_amount = last_dividend / yearly_yield / period / 12 * 100 + 0.01;
    var test_last_dividend = last_dividend;
    var max_length = String(Math.round(init_monthly_amount)).length;

    // 桁を落としながら収束
    var sign = 1;
    for (let i = max_length; i > 0; i--) {
        while (test_last_dividend * sign >= last_dividend * sign) {
            init_monthly_amount -= paddingright(i) * sign;
            test_last_dividend = cal_simple_last_dividend(period, yearly_yield, increase_rate, init_monthly_amount);
        }
        sign *= -1
    }
    return Math.round(init_monthly_amount);
}

// 投資期間を計算
function cal_period(last_dividend, monthly_amount, yearly_yield, increase_rate) {
    var init_period = last_dividend * 100 / monthly_amount / 12 / yearly_yield + 0.01;
    var test_last_dividend = last_dividend;
    var max_length = String(Math.round(init_period)).length;

    // 桁を落としながら収束
    var sign = 1;
    for (let i = max_length; i > 0; i--) {
        while (test_last_dividend * sign >= last_dividend * sign) {
            init_period -= paddingright(i) * sign;
            test_last_dividend = cal_simple_last_dividend(init_period, yearly_yield, increase_rate, monthly_amount)
        }
        sign *= -1
    }
    while (test_last_dividend * sign >= last_dividend * sign) {
        init_period -= 0.1 * sign;
        test_last_dividend = cal_simple_last_dividend(init_period, yearly_yield, increase_rate, monthly_amount)
    }
    sign *= -1
    return Math.round(init_period);
}

// 毎月配当利回りを計算
function cal_yearly_yield(last_dividend, period, monthly_amount, increase_rate) {
    var init_yearly_yield = last_dividend * 100 / monthly_amount / period / 12 + 0.01;
    var sign = 1;
    var test_last_dividend = last_dividend;
    var max_length = String(Math.round(init_yearly_yield)).length;

    // 桁を落としながら収束
    for (let i = max_length; i > 0; i--) {
        while (test_last_dividend * sign >= last_dividend * sign) {
            init_yearly_yield -= paddingright(i) * sign;
            test_last_dividend = cal_simple_last_dividend(period, init_yearly_yield, increase_rate, monthly_amount)
        }
        sign *= -1
    }
    while (test_last_dividend * sign >= last_dividend * sign) {
        init_yearly_yield -= 0.1 * sign;
        test_last_dividend = cal_simple_last_dividend(period, init_yearly_yield, increase_rate, monthly_amount)
    }
    return init_yearly_yield;
}

function drawbarchart(periods, yields, inc_yields, draw_chart) {
    if (typeof chart !== 'undefined' && chart) {
        chart.destroy();
    }

    Chart.defaults.global.defaultFontSize = 14;

    Chart.Legend.prototype.afterFit = function () {
        this.height = this.height + 10;
    };

    /* idが"radar-chart"の要素を取得 */
    var ctx = document.getElementById(draw_chart);
    Chart.defaults.global.elements.rectangle = {
        borderWidth: 2, // 枠線の太さ
        borderSkipped: 'bottom'
    };

    window.chart = new Chart(ctx, {
        // 線グラフ
        type: 'bar',

        plugins: [ChartDataLabels],

        // データセットのデータ
        data: {
            labels: periods,
            datasets: [{
                label: '増配なし',
                data: yields,
                backgroundColor: [
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                    'rgb(135,162,219,0.2)',
                ],
                borderColor: [
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                    'rgba(135,162,219)',
                ],
                datalabels: {
                    color: 'rgba(135,162,219)',
                    anchor: 'end',
                    align: 'end',
                }
            },
            {
                label: '増配あり',
                data: inc_yields,
                backgroundColor: [
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                    'rgb(233,82,149, 0.2)',
                ],
                borderColor: [
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                    'rgba(233,82,149)',
                ],
                datalabels: {
                    color: 'rgba(233,82,149)',
                    anchor: 'end',
                    align: 'end',
                }
            }
            ]
        },

        // ここに設定オプションを書きます
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        return value + '万円'
                    }
                }
            },
            scales: {
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
