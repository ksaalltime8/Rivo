import test from "node:test";
import assert from "node:assert/strict";
import {getGameStatus,supportedGames} from "../src/game-status.js";
test("Rivo exposes only games with a configured status source",()=>{assert.ok(supportedGames().includes("valorant"));assert.ok(supportedGames().includes("apex"));assert.ok(supportedGames().includes("minecraft"));});
test("unknown games are not falsely reported operational",async()=>{const result=await getGameStatus("some-random-game");assert.equal(result.status,"unsupported");assert.equal(result.url,null);});
test("publisher lookup failure is reported as unknown, not operational",async()=>{const old=globalThis.fetch;globalThis.fetch=async()=>{throw new Error("offline test")};try{const result=await getGameStatus("valorant");assert.equal(result.status,"unknown");assert.match(result.summary,/Could not verify live status/);}finally{globalThis.fetch=old;}});
