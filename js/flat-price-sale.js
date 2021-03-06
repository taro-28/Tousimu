cal_draw_last_funded_amount()

function param_check(monthly_amount = 100000, period = 20, yearly_yield = 1, last_funded_amount = 1000000) {
    if (period <= 0 || period > 80) {
        return $('.result').html('取り崩し期間は<br class="d-inline d-sm-none">1~80の整数で入力して下さい！');
    } else if (0 > yearly_yield || yearly_yield > 99.9) {
        return $('.result').html('利回りは<br class="d-inline d-sm-none">0~99.9の数値で入力して下さい！');
    } else if (monthly_amount < 10000 || monthly_amount > 9999999) {
        return $('.result').html('毎月取り崩す金額は<br class="d-inline d-sm-none">10,000~9,999,999円の整数で入力して下さい！');
    } else if (last_funded_amount < 1000000 || last_funded_amount > 999999999) {
        return $('.result').html('総資産額は<br class="d-inline d-sm-none">1,000,000~999,999,999円の整数で入力して下さい！');
    } else {
        return false;
    }
}
function cal_draw_last_funded_amount() {
    var monthly_amount = $('#id_last_funded_monthly_amount')[0].value
    var period = $('#id_last_funded_period')[0].value
    var yearly_yield = $('#id_last_funded_yearly_yield')[0].value
    $('.share_button').html('');
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var last_funded_amount = cal_last_funded_amount(monthly_amount, period, yearly_yield);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [period, funded_amounts, periods, principals] = cal_period(monthly_amount, yearly_yield, last_funded_amount);

        }
        else {
            var [period, funded_amounts, periods, principals] = cal_period_mobile(monthly_amount, yearly_yield, last_funded_amount);
        }
        $('.result').html('総資産額<br class="d-inline d-sm-none">' + last_funded_amount.toLocaleString() + '円');
        var sns_text = '利回り' + yearly_yield + '%で運用しながら、' + period + '年間、毎月' + Number(monthly_amount).toLocaleString() + '円取り崩すために必要な総資産額は' + last_funded_amount.toLocaleString() + '円です。';
        window.functionLib.make_share_button('twitter', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('line', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('facebook', sns_text, 'flat-price-sale');
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
            var [nise_period, funded_amounts, periods, principals] = cal_period(monthly_amount, yearly_yield, last_funded_amount);
        }
        else {
            var [nise_period, funded_amounts, periods, principals] = cal_period_mobile(monthly_amount, yearly_yield, last_funded_amount);
        }
        $('.result').html('毎月取り崩す金額<br class="d-inline d-sm-none">' + Math.round(monthly_amount).toLocaleString() + '円');
        var sns_text = Number(last_funded_amount).toLocaleString() + '円を、利回り' + yearly_yield + '%で運用しながら、' + period + '年間、毎月取り崩せる金額は' + Number(monthly_amount).toLocaleString() + '円です。';
        window.functionLib.make_share_button('twitter', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('line', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('facebook', sns_text, 'flat-price-sale');
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
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [period, funded_amounts, periods, principals] = cal_period(monthly_amount, yearly_yield, last_funded_amount);
        }
        else {
            var [period, funded_amounts, periods, principals] = cal_period_mobile(monthly_amount, yearly_yield, last_funded_amount);
        }
        if (period >= 80) {
            $('.result').html('取り崩し期間<br class="d-inline d-sm-none">80年以上');
            var sns_text = Number(last_funded_amount).toLocaleString() + '円を、利回り' + yearly_yield + '%で運用しながら、毎月' + Number(monthly_amount).toLocaleString() + '円取り崩せる期間は' + period + '年以上です。';
        }
        else {
            $('.result').html('取り崩し期間<br class="d-inline d-sm-none">' + Math.round(period).toLocaleString() + '年');
            var sns_text = Number(last_funded_amount).toLocaleString() + '円を、利回り' + yearly_yield + '%で運用しながら、毎月' + Number(monthly_amount).toLocaleString() + '円取り崩せる期間は' + period + '年です。';
        }
        window.functionLib.make_share_button('twitter', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('line', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('facebook', sns_text, 'flat-price-sale');
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
            var [period, funded_amounts, periods, principals] = cal_period(monthly_amount, yearly_yield, last_funded_amount);
        }
        else {
            var [period, funded_amounts, periods, principals] = cal_period_mobile(monthly_amount, yearly_yield, last_funded_amount);
        }
        $('.result').html('利回り ' + Math.round(yearly_yield * 10) / 10 + '%');
        var sns_text = Number(last_funded_amount).toLocaleString() + '円を、' + period + '年間、毎月' + Number(monthly_amount).toLocaleString() + '円取り崩すために必要な利回りは' + Math.round(yearly_yield * 10) / 10 + '%です。';
        window.functionLib.make_share_button('twitter', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('line', sns_text, 'flat-price-sale');
        window.functionLib.make_share_button('facebook', sns_text, 'flat-price-sale');
        drawlinechart(periods, funded_amounts, principals, 'id_forth_tab_radar_chart');
    }
}

// 初期表示：資産総額
$('#id_first_tab').click(cal_draw_last_funded_amount)

// 初期表示：マイツr気
$('#id_second_tab').click(cal_draw_monthly_amount)

// 初期表示：取り崩し期間
$('#id_third_tab').click(cal_draw_period)

// 初期表示：利回り
$('#id_forth_tab').click(cal_draw_yearly_yield)

// 資産総額
$('#id_last_funded_monthly_amount, #id_last_funded_period,#id_last_funded_yearly_yield')
    .on('input', cal_draw_last_funded_amount);

// 再描画：毎月
$('#id_monthly_amount_period, #id_monthly_amount_yearly_yield, #id_monthly_amount_last_funded_amount')
    .on('input', cal_draw_monthly_amount);

// 再描画：積立期間
$('#id_period_monthly_amount, #id_period_yearly_yield, #id_period_last_funded_amount')
    .on('input', cal_draw_period);

// 再描画：期待利回り
$('#id_yearly_yield_monthly_amount, #id_yearly_yield_period, #id_yearly_yield_last_funded_amount')
    .on('input', cal_draw_yearly_yield);

// 最終積立額と各年の額を計算
function cal_last_funded_amount(monthly_amount, period, yearly_yield) {

    var init_last_funded_amount = monthly_amount * period * (1 + yearly_yield / 100) + 0.01;
    var test_period = 0;
    var max_length = String(init_last_funded_amount).length;
    var sign = 1;

    // 桁を落としながら収束
    for (let i = max_length; i > 0; i--) {
        while (test_period * sign < period * 12 * sign) {
            init_last_funded_amount += paddingright(i) * sign;
            test_period = cal_simple_period(monthly_amount, yearly_yield, init_last_funded_amount);
        }
        sign *= -1
    }

    // 表示用最終積立額
    return Math.round(init_last_funded_amount);
}

// 毎月積立額を計算
function cal_monthly_amount(period, yearly_yield, last_funded_amount) {
    var init_monthly_amount = last_funded_amount / period / 12 + 0.01
    var test_period = period * 12;
    var max_length = String(init_monthly_amount).length;
    var sign = 1;

    // 桁を落としながら収束
    for (let i = max_length; i > 0; i--) {
        while (test_period * sign >= period * 12 * sign) {
            init_monthly_amount += paddingright(i) * sign;
            test_period = cal_simple_period(init_monthly_amount, yearly_yield, last_funded_amount);
        }
        sign *= -1
    }

    return init_monthly_amount;
}

// 積立期間を計算
function cal_period(monthly_amount, yearly_yield, last_funded_amount) {
    var [funded_amounts, periods, principals, output_funded_amounts, output_periods, output_principals, init_monthly_period, principal] = [[last_funded_amount], [], [last_funded_amount], [], [], [], 0, last_funded_amount];

    while (last_funded_amount > 0 && init_monthly_period <= 960) {
        periods.push(init_monthly_period);
        init_monthly_period++;
        last_funded_amount = (last_funded_amount - monthly_amount) * (1 + yearly_yield / 1200)
        principal -= monthly_amount
        principals.push(principal)
        funded_amounts.push(last_funded_amount);
    }

    var max_period = Math.ceil(init_monthly_period / 12)

    for (let i = 0; i < max_period * 12; i++) {
        if (i % max_period == 0) {
            output_funded_amounts.push(Math.round(funded_amounts[i] / 10000));
            if (principals[i] >= 0) {
                output_principals.push(Math.round(principals[i] / 10000));
            }
            var res = ''
            if (periods[i] >= 12) {
                res = String(Math.floor(periods[i] / 12)) + '年'
            }
            if (periods[i] % 12 != 0) {
                res = res + String(Math.floor(periods[i] % 12)) + 'ヶ月'
            }
            output_periods.push(res + '後')
        }
    }
    // 原点の期間を削除
    output_periods[0] = ""
    return [Math.floor(init_monthly_period / 12), output_funded_amounts, output_periods, output_principals];
}

// 積立期間を計算
function cal_period_mobile(monthly_amount, yearly_yield, last_funded_amount) {
    var [funded_amounts, periods, principals, output_funded_amounts, output_periods, output_principals, init_monthly_period, principal] = [[last_funded_amount], [], [last_funded_amount], [], [], [], 0, last_funded_amount];

    while (last_funded_amount > 0 && init_monthly_period <= 960) {
        periods.push(init_monthly_period);
        init_monthly_period++;
        last_funded_amount = (last_funded_amount - monthly_amount) * (1 + yearly_yield / 1200)
        principal -= monthly_amount
        principals.push(principal)
        funded_amounts.push(last_funded_amount);
    }

    var max_period = Math.ceil(init_monthly_period / 12)

    for (let i = 0; i < max_period * 12; i++) {
        if (i % (max_period * 3) == 0) {
            output_funded_amounts.push(Math.round(funded_amounts[i] / 10000));
            if (principals[i] >= 0) {
                output_principals.push(Math.round(principals[i] / 10000));
            }
            var res = ''
            if (periods[i] >= 12) {
                res = String(Math.floor(periods[i] / 12)) + '年'
            }
            if (periods[i] % 12 != 0) {
                res = res + String(Math.floor(periods[i] % 12)) + 'ヶ月'
            }
            output_periods.push(res + '後')
        }
    }
    // 原点の期間を削除
    output_periods[0] = ""
    return [Math.floor(init_monthly_period / 12), output_funded_amounts, output_periods, output_principals];
}

// 積立期間を計算
function cal_simple_period(monthly_amount, yearly_yield, last_funded_amount) {
    var init_monthly_period = 0;
    while (last_funded_amount > 0 && init_monthly_period <= 960) {
        init_monthly_period++;
        last_funded_amount = (last_funded_amount - monthly_amount) * (1 + yearly_yield / 1200)
    }
    return init_monthly_period;
}

// 利回りを計算
function cal_yearly_yield(monthly_amount, period, last_funded_amount) {
    var init_yearly_yield = Math.round((1 - last_funded_amount / monthly_amount / period / 12) * 100) + 0.01;
    if (init_yearly_yield != 0) {
        if (init_yearly_yield > 0) {
            var sign = 1;
        } else {
            var sign = -1;
        }
        var test_period = period;
        var max_length = String(init_yearly_yield).length;
        var sign = 1;

        // 桁を落としながら収束
        for (let i = max_length; i > 0; i--) {
            while (test_period * sign >= period * 12 * sign) {
                init_yearly_yield -= paddingright(i) * sign;
                test_period = cal_simple_period(monthly_amount, init_yearly_yield, last_funded_amount);
            }
            sign *= -1
        }
        while (test_period * sign >= period * 12 * sign) {
            init_yearly_yield -= 0.1 * sign;
            test_period = cal_simple_period(monthly_amount, init_yearly_yield, last_funded_amount);
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
    var ctx = document.getElementById(draw_chart);

    window.chart = new Chart(ctx, {
        // 線グラフ
        type: 'line',

        plugins: [ChartDataLabels],

        // データセットのデータ
        data: {
            labels: periods,
            datasets: [{
                label: '利回りあり',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(233,82,149)',
                data: funded_amounts,
                datalabels: {
                    color: 'rgba(233,82,149)',
                    anchor: 'end',
                    align: 'end',
                }
            },
            {
                label: '利回りなし',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(135,162,219)',
                data: principals,
                datalabels: {
                    color: 'rgba(135,162,219)',
                    anchor: 'start',
                    align: 'start',
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
                    }
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

// 最大の位が1で残りは0の整数を生成
function paddingright(n) {
    var one = '1';
    for (let i = 0; i < n; i++) {
        one += '0'
    }
    return Number(one);
};
