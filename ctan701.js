const showHome = () => {
    document.getElementById('H').style.backgroundColor = 'lightgray';
    document.getElementById('S').style.backgroundColor = 'white';
    document.getElementById('HOMEPAGE').style.display = 'block';
    document.getElementById('STATS').style.display = 'none';
}

const showStats = () => {
    document.getElementById('H').style.backgroundColor = 'white';
    document.getElementById('S').style.backgroundColor = 'lightgray';
    document.getElementById('HOMEPAGE').style.display = 'none';
    document.getElementById('STATS').style.display = 'block';
    getdata();
}

const getdata = () => {
    const uri = encodeURI('https://covid-19.dataflowkit.com/v1/new zealand');
    const fetchPromise = fetch(uri,{
        headers: {
            "Accept" : "application/json",
        },
    });
    const streamPromise = fetchPromise.then((r) => {
        return r.json();
    });
    streamPromise.then((d) => {
        const activecase = d['Active Cases_text'];
        let totalcase = d['Total Cases_text'];
        let totaldeath = d['Total Deaths_text'];
        let totalrecover = d['Total Recovered_text'];
        const date = d['Last Update'];
        const newcase = d['New Cases_text'];
        let innertags = "<p>Last Update on: " + date + "</p><br>" + "<p>In NewZealand, we have... </p><br>";
        innertags += "<p>TotalCases: " + totalcase + "</p>";
        innertags += "<p>TotalRecovers: " + totalrecover + "</p>";
        innertags += "<p>TotalDeaths: " + totaldeath + "</p>";
        innertags += "<br><p>We have " + activecase + " active cases.</p><br><br>";
        innertags += "<p>There are <h1 id = 'newcase'>" + newcase + "</h1><p> cases from yesterday.</p>";
        document.getElementById('reportP').innerHTML = innertags;
        if(newcase[0] === "+") {
            document.getElementById('newcase').style.color = 'green';
        }else{
            document.getElementById('newcase').style.color = 'red';
        }
        console.log(totalcase);
        totalcase = totalcase.replace(/\,/g,'');
        totaldeath = totaldeath.replace(/\,/g,'');
        totalrecover = totalrecover.replace(/\,/g,'');
        draw(parseInt(totalcase), parseInt(totaldeath), parseInt(totalrecover));
   
    });
}

function draw(totalcase, totaldeath, totalrecover){
    const deathper = totaldeath / totalcase;
    const recoverper = totalrecover / totalcase;
    let innertags = "<svg xmlns = 'http://www.w3.org/2000/svg' viewBox = '0 0 500 500'>";
    innertags += "<line x1 = '0' y1 = '470' x2 = '500' y2 = '470' stroke = 'black' stroke-width = '2' />";
    innertags += "<rect x = '50' y = '" + (470 - 470 * recoverper)+ "' width = '100' height = '" + (470 * recoverper) + "' fill = 'blue' />";
    innertags += "<text x = '85' y = " + (460 - 470 * recoverper) + " fill = 'red'>" + totalrecover + "</text>";
    innertags += "<text x = '50' y = '500' fill = 'black'>TotalRecover</text>";
    innertags += "<rect x = '200' y = '" + (470 - 470 * deathper)+ "' width = '100' height = '" + (470 * deathper) + "' fill = 'red' />";
    innertags += "<text x = '235' y = " + (460 - 470 * deathper) + " fill = 'red'>" + totaldeath + "</text>";
    innertags += "<text x = '210' y = '500' fill = 'black'>TotalDeath</text>";
    innertags += "<rect x = '350' y = '0' width = '100' height = '470' fill = 'green' />";
    innertags += "<text x = '385' y = '20' fill = 'red'>" + totalcase + "</text>";
    innertags += "<text x = '365' y = '500' fill = 'black'>TotalCases</text>";
    innertags += "</svg>";
    document.getElementById('img').innerHTML = innertags;
    
}
window.onload = showHome;