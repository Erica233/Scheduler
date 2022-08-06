import express from 'express';
import fileupload from "express-fileupload";
import cors from 'cors';

import https from 'https';
//import { http, https } from 'follow-redirects';
import cheerio from 'cheerio';

const app = express();

app.use(
    fileupload({
        createParentPath: true,
    }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let results = [];

app.post("/upload-form", async (req, res) => {
    try {
 if(req.body){
     console.log('got body:', req.body);
     const year = req.body.year;
            const semester = req.body.semester.toLowerCase();
            const grade = req.body.grade.toLowerCase();
            const days = req.body.days;
            let htmlstr = '';
            let parseSemester = semester;
            if(semester=="summer1" || semester=="summer2"){
            parseSemester = "summer";
        }
        let reqq = https.request({
            'hostname': 'registrar.duke.edu',
            'path':'/'+parseSemester+'-'+year+'-academic-calendar/' //2021 fall; 2023 fall
        }, response=>{
     console.log("statusCode:");
     console.log(response.statusCode);
     if(response.statusCode==301){
                let reqq2 = https.request({
                    'hostname': 'registrar.duke.edu',
                    'path': '/calendars-key-dates/current-academic-calendar/'+parseSemester+'-'+year+'-academic-calendar'  //2021 fall; 2023 fall
                }, response=>{
                    response.on('data', buffer=>{
                        htmlstr+=buffer;
                    });
                    response.on('end', ()=>{
                    console.log("results:");
                    parseHTML(htmlstr, year, semester, grade, days);
   console.log(results);
   let ts = '';
   if(results.length!=0){
       ts = new Date(year+"/"+results[0][1].split(" ")[1]).getTime();
   }
   res.send({
       data: true,
                        startDate: ts,
                        message: results,
                    });
                    results=[];
                    });
                });
                reqq2.end();
            }
            else if(response.statusCode==200){
                response.on('data', buffer=>{
                    htmlstr+=buffer;
                });
                response.on('end', ()=>{
                console.log("results:");
                parseHTML(htmlstr, year, semester, grade, days);
                    console.log(results);
      let ts = '';
      if(results.length!=0){
   ts = new Date(year+"/"+results[0][1].split(" ")[1]).getTime();
      }
      res.send({
   data: true,
                    startDate: ts,
                    message: results,
                });
                results=[];
                });
            }
     else{
  res.send({
      data: false,
                    message: "The calendar for this semester does not exist in Duke Calendar now",
  });
            }
        });
            reqq.end();
 }
    } catch (err) {
        res.status(500).send(err);
    }
});

const port = process.env.PORT || 2002;

app.listen(port, () => console.log(`Server started on port ${port}`));

//num to weekdays
function numToWeekdays(num) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] [num] || '';
}

//get dates
function getDateBetween(start, end, days) {
    var startTime = new Date(start);
    var startCopy = new Date(start);
    var endTime = new Date(end);
    var i = 1;
    var flag = -1;
    while (endTime - startTime >= 0) {
        if(days.length==1){
            if (startTime.getDay() != days[0]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1){
      i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==2){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==3){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1] && startTime.getDay() != days[2]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==4){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1] && startTime.getDay() != days[2] && startTime.getDay() != days[3]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==5){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1] && startTime.getDay() != days[2] && startTime.getDay() != days[3] && startTime.getDay() != days[4]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==6){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1] && startTime.getDay() != days[2] && startTime.getDay() != days[3] && startTime.getDay() != days[4] && startTime.getDay() != days[5]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
        else if (days.length==7){
            if (startTime.getDay() != days[0] && startTime.getDay() != days[1] && startTime.getDay() != days[2] && startTime.getDay() != days[3] && startTime.getDay() != days[4] && startTime.getDay() != days[5] && startTime.getDay() != days[6]) {
                startTime.setDate(startTime.getDate() + 1);
                if (startTime.getDay() == 1 && flag==1) {
                    i = i + 1;
                }
                continue;
            }
        }
 flag=1;
        let month = startTime.getMonth();
        month = month<9?''+(month+1):month+1;
        let day = startTime.getDate().toString().length == 1 ? "" + startTime.getDate() : startTime.getDate();
        results.push([i, numToWeekdays(startTime.getDay()) + " " + month + "/" + day, 1]);
        startTime.setDate(startTime.getDate() + 1);
        if (startTime.getDay() == 1 && startTime!=startCopy) {
            i = i + 1;
        }
    }
}

function crawler(year, semester, grade, days){
    let htmlstr = '';
    let req = https.request({
    'hostname': 'registrar.duke.edu',
    'path':'/'+semester+'-'+year+'-academic-calendar/' //2021 fall; 2023 fall
    }, response=>{
        response.on('data', buffer=>{
            htmlstr+=buffer;
        });
        response.on('end', ()=>{
            //onsole.log(htmlstr);
            parseHTML(htmlstr,year, semester, grade, days);
        });
    });
    req.end();
}


function parseHTML(htmlstr, year, semester, grade, days){
    var term = '';
    var tterm = '';
    var startDate = '';
    var endDate = '';
    var holidays = '';
    if(semester=="summer1"){
        term = "term i ";
 tterm = "term 1";
    }
    else if(semester=="summer2"){
        term = "term ii";
 tterm = "term 2";
    }
    const $ = cheerio.load(htmlstr);
    const tableStr = $( '.node__content tbody tr').each((index, el)=>{
        if(semester=="summer1" || semester=="summer2"){
            if(($(el).find('td').text().toLowerCase().includes(term)||$(el).find('td').text().toLowerCase().includes(tterm)) && $(el).find('td').text().toLowerCase().includes("classes begin")){
                    startDate = $(el).find('td').eq(0).text();
                    startDate += (", " + year);
                    var date = new Date(startDate);
                    var day1 = date.getDay();
                    var date1 = date.getDate();
                var month1 = date.getMonth();
                }
            if(($(el).find('td').text().toLowerCase().includes(term)||$(el).find('td').text().toLowerCase().includes(tterm)) && $(el).find('td').text().toLowerCase().includes("classes end")){
                    endDate = $(el).find('td').eq(0).text();
                    endDate += (", " + year);
                    var date = new Date(endDate);
                    var day1 = date.getDay();
                    var date1 = date.getDate();
                var month1 = date.getMonth();
                }
        }
            else{
                if($(el).find('td').text().toLowerCase().includes("semester") && $(el).find('td').text().toLowerCase().includes('begin')){
                    startDate = $(el).find('td').eq(0).text();
                    startDate += (", " + year);
                    var date = new Date(startDate);
                    var day1 = date.getDay();
                    var date1 = date.getDate();
                    var month1 = date.getMonth();
                }
                else if($(el).find('p').text().toLowerCase().includes("semester") && $(el).find('p').text().toLowerCase().includes('begin')){
                    startDate = $(el).find('p').eq(0).text();
                    startDate += (", " + year);
                    var date = new Date(startDate);
                    var day1 = date.getDay();
                    var date1 = date.getDate();
                    var month1 = date.getMonth();
                }
                if($(el).find('td').text().toLowerCase().includes(grade) && $(el).find('td').text().toLowerCase().includes('classes end')){
                    if(grade=='graduate'){
                        if($(el).find('td').text().includes('Graduate') || $(el).find('td').text().includes(' graduate')){
                            endDate = $(el).find('td').eq(0).text();
                            endDate += (", " + year);
                            var date = new Date(endDate);
                            var day1 = date.getDay();
                            var date1 = date.getDate();
                            var month1 = date.getMonth();
                        }
                    }
                    else{
                        endDate = $(el).find('td').eq(0).text();
                        endDate += (", " + year);
                        var date = new Date(endDate);
                        var day1 = date.getDay();
                        var date1 = date.getDate();
                        var month1 = date.getMonth();
                    }
                }
            }

            //holidays
            if($(el).find('td').text().toLowerCase().includes("no classes held") || $(el).find('td').text().toLowerCase().includes("no classes are held")){
                if(holidays==''){
                    holidays += $(el).find('td').eq(0).text();
                }
                else{
                    holidays += '; ' + $(el).find('td').eq(0).text();
                }
            }
            if($(el).find('td').text().toLowerCase().includes("fall break")){
                if(holidays==''){
                    holidays += $(el).find('td').eq(0).text();
                }
                else{
                    holidays += '; ' + $(el).find('td').eq(0).text();
                }
            }
            if($(el).find('td').text().toLowerCase().includes("thanksgiving")){
                if(holidays==''){
                    holidays += $(el).find('td').eq(0).text();
                }
                else{
                    holidays += '; ' + $(el).find('td').eq(0).text();
                }
            }
            if($(el).find('td').text().toLowerCase().includes("spring recess")){
                if(holidays==''){
                    holidays += $(el).find('td').eq(0).text();
                }
                else{
                    holidays += '; ' + $(el).find('td').eq(0).text();
                }
            }
            if($(el).find('td').text().toLowerCase().includes("resume")){
                holidays += ' - ';
                holidays += $(el).find('td').eq(0).text();
            }
    });

    getDateBetween(new Date(startDate), new Date(endDate), days);
    var splitArr = [];
    var holidaysArr = [];
    splitArr = holidays.split(";");
    for(let i=0; i<splitArr.length; i++){
            var numSplitArr = splitArr[i].split("-");
            var numSplit = numSplitArr.length;
            if(numSplit==2 || numSplit==3){
                var date_begin = '';
                var date_end = '';
                if(numSplit==2){
                    var startEndArr = splitArr[i].split("-");
                    var holidayStart = startEndArr[0] + year;
                    var holidayEnd = startEndArr[1] + ' ' +  year;
                    date_begin = new Date(holidayStart);
                    date_end = new Date(holidayEnd);
                }
                else{
                    var spltDate = splitArr[i].split(",");
                    var splitMon = spltDate[1].split("-");
                    var star = splitMon[0] + year;
                    var splitDay = splitMon[0].split(" ");
                    var en = splitDay[1] + splitMon[1] + ' ' + year;
                    date_begin = new Date(star);
                    date_end = new Date(en);
                }
                for(let i = date_begin.getTime(); i<=date_end.getTime();){
                    let push_date = new Date(parseInt(i));
                    for(let j = 0; j<days.length; j++){
                        if(push_date.getDay()==days[j]){
                            holidaysArr.push(push_date);
                            break;
                        }
                    }
                    i = i+24 * 60 * 60 * 1000;
                }
            }
            else{
                var str = splitArr[i] + ' ' + year;
                let str_date = new Date(str);
                for(let j = 0; j<days.length; j++){
                    if(str_date.getDay()==days[j]){
                        holidaysArr.push(str_date);
                        break;
                    }
                }
            }
    }

    //console.log(holidaysArr);

    for(let i=0; i<holidaysArr.length; i++){
            let month = holidaysArr[i].getMonth()+1;
            let day = holidaysArr[i].getDate();
            holidaysArr[i] = month + "/" + day;
    }
    if(holidaysArr.length==0){
 for(let i=0; i<results.length; i++){
     results[i][2] = "";
 }
    }
    for(let i=0; i<results.length; i++){
        let arr = results[i][1].split(" ");
            for(let j=0; j<holidaysArr.length; j++){
                if(arr[1] == holidaysArr[j]){
                    results[i][2] = "No class";
                    break;
                } else {
                    results[i][2] = "";
                }
            }
    }
}
