const safeText=value=>String(value??"").slice(0,1800);
export async function runAutomations({guild,trigger,member,message,settings}){
 const rules=Array.isArray(settings?.automations)?settings.automations.slice(0,50):[];
 for(const rule of rules){try{
  if(rule.enabled===false||rule.trigger!==trigger)continue;
  if(trigger==="message_contains"&&(!message||!message.content.toLowerCase().includes(String(rule.match||"").toLowerCase())))continue;
  if(rule.channelId&&message?.channelId!==rule.channelId)continue;
  const actions=Array.isArray(rule.actions)?rule.actions.slice(0,5):[];
  for(const action of actions){
   if(action.type==="send_message"){
    const channel=guild.channels.cache.get(String(action.channelId||message?.channelId||""));
    if(channel?.isTextBased())await channel.send({content:safeText(action.content).replaceAll("{user}",member?`${member}`:message?`${message.author}`:"community").replaceAll("{server}",guild.name),allowedMentions:{parse:[]}});
   }else if(action.type==="add_role"&&member&&/^\d{17,20}$/.test(String(action.roleId||""))){
    const role=guild.roles.cache.get(String(action.roleId));if(role&&!role.managed&&role.position<guild.members.me.roles.highest.position)await member.roles.add(role,"Rivo automation");
   }
  }
 }catch(error){console.error("[Rivo automation]",rule?.name||rule?.trigger,error);}}
}
