"use strict";const Recipe=use("App/Models/Recipe"),Drive=use("Drive"),{validateAll:validateAll}=use("Validator"),Env=use("Env"),fetch=require("node-fetch"),debug=require("debug")("Ferdi:internalServer:RecipeController"),{LIVE_FERDI_API:LIVE_FERDI_API}=require("../../../../config"),{API_VERSION:API_VERSION}=require("../../../../environment-remote"),RECIPES_URL=`${LIVE_FERDI_API}/${API_VERSION}/recipes`;class RecipeController{async list({response:e}){const t=await fetch(RECIPES_URL),a=[...JSON.parse(await t.text()),...(await Recipe.all()).rows.map((e=>({id:e.recipeId,name:e.name,...JSON.parse(e.data)})))];return e.send(a)}async search({request:e,response:t}){const a=await validateAll(e.all(),{needle:"required"});if(a.fails())return t.status(401).send({message:"Please provide a needle",messages:a.messages(),status:401});const s=e.input("needle");let r;if("ferdi:custom"===s){r=(await Recipe.all()).toJSON().map((e=>({id:e.recipeId,name:e.name,...JSON.parse(e.data)})))}else{let e=[];if("true"==Env.get("CONNECT_WITH_FRANZ")){const t=await fetch(`${RECIPES_URL}/search?needle=${encodeURIComponent(s)}`);e=JSON.parse(await t.text())}debug("remoteResults:",e);const t=(await Recipe.query().where("name","LIKE",`%${s}%`).fetch()).toJSON().map((e=>({id:e.recipeId,name:e.name,...JSON.parse(e.data)})));debug("localResults:",t),r=[...t,...e||[]]}return t.send(r)}async update({request:e,response:t}){if("true"==Env.get("CONNECT_WITH_FRANZ")){const a=e.all(),s=await fetch(`${RECIPES_URL}/update`,{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}});return t.send(await s.json())}return t.send([])}async popularRecipes({response:e}){const t=await fetch(`${RECIPES_URL}/popular`),a=JSON.parse(await t.text());return e.send(a)}async download({response:e,params:t}){const a=await validateAll(t,{recipe:"required|accepted"});if(a.fails())return e.status(401).send({message:"Please provide a recipe ID",messages:a.messages(),status:401});const s=t.recipe;return"true"==Env.get("CONNECT_WITH_FRANZ")?e.redirect(`${RECIPES_URL}/download/${s}`):/\.+/.test(s)||/\/+/.test(s)?e.send("Invalid recipe name"):await Drive.exists(`${s}.tar.gz`)?e.send(await Drive.get(`${s}.tar.gz`)):e.status(400).send({message:"Recipe not found",code:"recipe-not-found"})}}module.exports=RecipeController;