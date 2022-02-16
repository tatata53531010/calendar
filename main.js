'use strict';

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1; //現在の月
const currentDate = date.getDate();

//表示する月を切り替える関数
const transition = (year, selector) => {
    const firstDate = new Date(year, (selector -1), 1); //selector月1日
    const lastDate = new Date(year, (selector), 0); //selector月31日
    const firstDay = firstDate.getDay(); //月の最初の日の曜日
    const lastDateCount = lastDate.getDate(); //月の最後の日
    console.log(firstDay);
    console.log(lastDateCount);

    $('table').removeClass('active'); //activeクラスを削除する

    const toInsert = document.getElementsByTagName('table'); //HTMLを挿入する場所の要素を取得
    const addActive = toInsert[selector - 1];
    addActive.setAttribute('class', 'active');

    let dayCount = 1;
    let createHtml = '';

    createHtml = `<h1>${year}/${selector}</h1>`;
    createHtml += '<tr>'; //曜日を表示させるために<tr>を作る

    const weeks = ['日','月','火','水','木','金','土',];
    for (let i = 0; i < weeks.length; i++) {
        createHtml += `<td>${weeks[i]}</td>`;
    }
    createHtml += '</tr>'; 

    for (let n = 0; n < 6; n++) {
        createHtml += '<tr>'; //1週間の日付を追加するために<tr>タグを６行追加する
        
        for (let d = 0; d < 7; d++) { //７日間表示させるため<td>を７個作る
            if (n == 0 && d < firstDay) {
                createHtml += '<td></td>';
            } else if (dayCount > lastDateCount) {
                createHtml += '<td></td>';
            } else {
                createHtml += `<td>${dayCount}</td>`;
                dayCount++;
            }
        }

        createHtml += '</tr>';
    }
    addActive.innerHTML = createHtml;
}

//現在の日付にマークをつける関数
const toDateMark = (currentMonth, currentDate) => {
    const dates = document.getElementsByTagName('td');
 
    for (let i = 0; i < dates.length; i++) {
        let getDate = dates[i].textContent; 
        const currentDisp = document.querySelector('.active h1').textContent; //h1要素のコンテンツを取得
        const monthDisp = currentDisp.slice(5 , 7); //コンテンツ内の月の部分を取得

        if (getDate == currentDate && monthDisp == currentMonth) {
            //現在の日付に値する<td>のみにクラス属性を追加する
             dates[i].setAttribute('class', 'active_date');
        } else {
            ;
        }
    }
 }

//←を押した時の処理 前の月を表示
$('.calendar-control-prev').on('click', (e) => {
    e.preventDefault();

    const currentDisp = document.querySelector('.active');
    const currentDispAttr = currentDisp.getAttribute('id'); //表示されているtableの属性値を取得
    const attrNum = Number.parseFloat(currentDispAttr) - 1; //属性値を数値化する

    if (attrNum === 0) {
        return ;
    } else {
        transition(currentYear, attrNum);
    }

    toDateMark(currentMonth, currentDate);
});

//→を押した時の処理 次の月を表示
$('.calendar-control-next').on('click', (e) => {
    e.preventDefault();

    const currentDisp = document.querySelector('.active');
    const currentDispAttr = currentDisp.getAttribute('id'); //表示されているtableの属性値を取得
    const attrNum = Number.parseFloat(currentDispAttr) + 1; //属性値を数値化する

    if (attrNum === 13) {
        return ;
    } else {
        transition(currentYear, attrNum);
    }

    toDateMark(currentMonth, currentDate);
});

transition(currentYear, currentMonth); //初期状態では現在の月を表示
toDateMark(currentMonth, currentDate);