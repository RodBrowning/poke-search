#!/usr/bin/env node
var fetch = require("node-fetch");
var readline = require("readline");

require("yargs")
	.usage("$0 <cmd> [args]")
	.command(
		"pokemon [name]",
		"and then you put your pokemon name or number",
		{
			pokemon: { name: "bulbasaur" }
		},
		argv => {
			if (argv.name) {
				setTimeout(() => {
					fetch("https://pokeapi.co/api/v2/pokemon/" + argv.name)
						.then(data => {
							return data.json();
						})
						.then(data => {
							console.log(`pokemon id: ${data.id}`);
							console.log(`pokemon name: ${data.name}`);
							console.log(`pokemon weight: ${data.weight} kg`);
							console.log(`pokemon height: ${data.height}`);
						})
						.catch(err => {
							console.log("Something went wrong");
						});
				}, 100);
			} else {
				var userChoise = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
				userChoise.question(
					"What is the number or name of your pokemon? \n",
					answer => {
						fetch("https://pokeapi.co/api/v2/pokemon/" + answer)
							.then(data => {
								return data.json();
							})
							.then(data => {
								console.log(`pokemon id: ${data.id}`);
								console.log(`pokemon name: ${data.name}`);
								console.log(
									`pokemon weight: ${data.weight} kg`
								);
								console.log(`pokemon height: ${data.height}`);
							})
							.catch(err => {
								console.log("Something went wrong");
							});
						userChoise.close();
					}
				);
			}
		}
	)
	.help().argv;
