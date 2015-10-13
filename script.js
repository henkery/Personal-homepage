happen = false;
var max = 5;
var min = 1;
instable = true;
var prevtext;
store = {"cats":{
	"fun":[{"name":"LinkedIn","url":"www.linkedin.com"},{"name":"9gag","url":"9gag.com"}],
	"social":[{"name":"youtube","url":"www.youtube.com"}, {"name":"facebook","url":"facebook.com"}],
	"news":[{"name":"nu.nl","url":"www.nu.nl"}, {"name":"NOS","url":"nos.nl"}],
	"other":[{"name":"Radio 1","url":"radio1.nl"}]
}};

function organiseMenu() {
	var element = document.getElementById("content");
	for (var key in store.cats) {
		var maindiv = document.createElement("div");
		var node = document.createTextNode(key);
		var num = Math.floor(Math.random() * (max - min)) + min;
		if (num == prevnum)
		{
			if (num > min)
				num=num-1;
			else if (num < max)
				num=num+1;
		}
		var prevnum = num;
		maindiv.className = "menuitem menu"+num;
		maindiv.addEventListener("click", handleItemHover);
		maindiv.appendChild(node);
		element.appendChild(maindiv);
	};
}

function handleItemHover (key) {
	var base = document.getElementById("links");
	base.innerHTML = "";
	if (this.firstChild.data != prevtext) {
		var newt = document.createElement("div");
		var holder = document.createElement("div");
		holder.className = "holder";
		for (key in store.cats[this.firstChild.data]) {
			var newlink = document.createElement("a");
			var newitem = document.createElement("div");
			newlink.className = "inneritem";
			newlink.href = "http://" +  store.cats[this.firstChild.data][key].url;
			var newtext = document.createTextNode(store.cats[this.firstChild.data][key].name);
			newitem.appendChild(newtext);
			newlink.appendChild(newitem);			
			holder.appendChild(newlink);
		}
		prevtext = this.firstChild.data;
		newt.className = "fullitem "+this.firstChild.parentNode.className;
		newt.appendChild(holder);
		base.appendChild(newt);
	} else {prevtext = "";}
}

function inputhandling() {
	if (instable) {
		var text = document.getElementById("inputbox").value;
		var url = "http://api.duckduckgo.com/?q="+text+"&format=json&t=myhomepage&callback=?";
		$.getJSON(url, function(result){
			var base = document.getElementById("links");
			base.innerHTML = "";
			var holder = document.createElement("div");
			var overholder = document.createElement("div");
			overholder.className = "overholder";
			holder.className = "searchholder";
			for (key in result.RelatedTopics)
			{
				if (typeof result.RelatedTopics[key].Text != 'undefined') {
					var link = document.createElement("a");
					var newt = document.createElement("div");
					link.href = result.RelatedTopics[key].FirstURL;
					link.className = "searchitem";
					newt.innerHTML = result.RelatedTopics[key].Text;
					if (result.RelatedTopics[key].Icon.URL != "") {
						var img = document.createElement("img");
						img.className = "searchimage";
						img.src = result.RelatedTopics[key].Icon.URL;
						link.appendChild(img);
					}
					link.appendChild(newt);
					holder.appendChild(link);
				}
			}
			overholder.appendChild(holder);
			base.appendChild(overholder);
		});
	}
}

function handlejson(data)
{
	console.log(data);
}

function httpGet(theUrl)
{
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function emptytext()
{
	var element = document.getElementById("prepost");
	element.innerHTML = "";
	element.removeEventListener("animationend", emptytext);
}

function focuss()
{
	if (happen) {
		var element = document.getElementById("prepost");
		element.innerHTML = "I am looking for";
		element.id = "preanimate";
		var element = document.getElementById("searcheranimatera");
		element.id = "searcheranimate";
	}
	else {
		var element = document.getElementById("pre");
		element.innerHTML = "I am looking for";
		element.id = "preanimate";
		var element = document.getElementById("searcher");
		element.id = "searcheranimate";
		happen = true;
	}
}

function defocus()
{
	var text = document.getElementById("inputbox").value;
	if (text == "") {
		var element = document.getElementById("preanimate");
		element.id = "prepost";
		element.addEventListener("animationend", emptytext);
		var element = document.getElementById("searcheranimate");
		element.id = "searcheranimatera";

	}
}