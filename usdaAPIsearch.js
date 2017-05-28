var apiKey = "&api_key=mWRRR0j4NzUVShXeOBuplTrJK3HkDS81X4QNCog5";

document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons()
{
	document.getElementById("submitFoodItem").addEventListener("click", function(event)
	{
		var req = new XMLHttpRequest();
		var searchFoodItem = document.getElementById("inputFoodItem").value;
		var sortMethod = "&sort=n";
		var maxFoodItems = "&max=25";
		var indexInArray = document.getElementById("inputFoodIndex").value;
		// apiKey = "Your API key here";
		var fullURL = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + searchFoodItem + sortMethod + maxFoodItems + indexInArray + apiKey;
		req.open("GET", fullURL, true);
		req.send(null);
		req.addEventListener("load", function()
		{
			
			if (req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(req.responseText);
				document.getElementById("foodIndex").textContent = response.list.item[indexInArray].offset;
				document.getElementById("foodName").textContent = response.list.item[indexInArray].name;
				document.getElementById("foodGroup").textContent = response.list.item[indexInArray].group;
				document.getElementById("foodNDBNo").textContent = response.list.item[indexInArray].ndbno;
				document.getElementById("foodDS").textContent = response.list.item[indexInArray].ds;
			}
			else
			{
				console.log("Error in network request: " + req.statusText);
			}
		});
		event.preventDefault();
	});
}
