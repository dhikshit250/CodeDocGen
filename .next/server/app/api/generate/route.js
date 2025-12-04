"use strict";(()=>{var e={};e.id=290,e.ids=[290],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},4074:e=>{e.exports=require("perf_hooks")},63477:e=>{e.exports=require("querystring")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},42415:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>L,originalPathname:()=>k,patchFetch:()=>x,requestAsyncStorage:()=>N,routeModule:()=>y,serverHooks:()=>w,staticGenerationAsyncStorage:()=>A,staticGenerationBailout:()=>j});var n={};r.r(n),r.d(n,{GET:()=>_,POST:()=>m});var a=r(95419),o=r(69108),s=r(99678),i=r(78070),d=r(47033),l=r(12030),u=r(12279),p=r(36462),c=r(3205),f=r(65256);let g=f.Ry({prompt:f.Z_().min(1,"Prompt is required"),type:f.Km(["code","docs","both"]),language:f.Z_().optional(),framework:f.Z_().optional(),settings:f.Ry({includeTests:f.O7().default(!1),includeDiagrams:f.O7().default(!1),addComments:f.O7().default(!0)}).optional()});async function m(e){try{let t=await (0,c.I)();if(!t?.user?.id)return i.Z.json({error:"Unauthorized"},{status:401});let r=await e.json(),n=g.parse(r),a=new Date().toISOString().split("T")[0],o=await d.db.select().from(l.j_).where((0,u.xD)((0,u.eq)(l.j_.userId,t.user.id),(0,u.eq)(l.j_.date,new Date(a)))).limit(1),s=o[0]||{generations:0,tokensUsed:0,cost:0};if(s.generations>=10)return i.Z.json({error:"Daily generation limit exceeded. Please upgrade your plan."},{status:429});let p=(await d.db.insert(l.ed).values({userId:t.user.id,prompt:n.prompt,type:n.type,settings:n.settings,status:"running"}).returning())[0].id;try{let e=await h(n.prompt,n.type,n.language,n.framework,n.settings),r=(await d.db.insert(l.q).values({userId:t.user.id,name:n.prompt.split(" ").slice(0,3).map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" "),description:`Generated ${n.type} for: ${n.prompt}`,type:n.type,language:n.language,framework:n.framework,prompt:n.prompt,settings:n.settings}).returning())[0].id,c=[];for(let t of e.files){let e=await d.db.insert(l.QZ).values({projectId:r,name:t.name,path:t.path,type:t.type,language:t.language,content:t.content,size:t.content.length}).returning();c.push(e[0])}await d.db.update(l.ed).set({status:"completed",projectId:r,tokensUsed:e.tokensUsed,cost:e.cost,completedAt:new Date}).where((0,u.eq)(l.ed.id,p));let f=e.tokensUsed,g=e.cost;return o[0]?await d.db.update(l.j_).set({generations:s.generations+1,tokensUsed:s.tokensUsed+f,cost:s.cost+g}).where((0,u.eq)(l.j_.id,o[0].id)):await d.db.insert(l.j_).values({userId:t.user.id,date:new Date(a),generations:1,tokensUsed:f,cost:g}),i.Z.json({success:!0,generationId:p,projectId:r,files:c,tokensUsed:f,cost:g})}catch(e){return await d.db.update(l.ed).set({status:"failed",error:e instanceof Error?e.message:"Unknown error"}).where((0,u.eq)(l.ed.id,p)),i.Z.json({error:"Generation failed",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}catch(e){return console.error("Generation API error:",e),i.Z.json({error:"Internal server error"},{status:500})}}async function h(e,t,r,n,a){await new Promise(e=>setTimeout(e,2e3));let o=[];return("code"===t||"both"===t)&&(r?.includes("React")||n?.includes("React")?o.push({name:"App.tsx",path:"src/App.tsx",type:"code",language:"typescript",content:`import React, { useState, useEffect } from 'react';

interface Props {
  // Add your props here
}

export const GeneratedComponent: React.FC<Props> = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Component initialization
    console.log('Generated for: ${e}');
  }, []);

  return (
    <div className="generated-component">
      <h1>Generated Component</h1>
      <p>This component was generated based on: ${e}</p>
      ${a?.addComments?"<!-- Comments added as requested -->":""}
    </div>
  );
};`}):r?.includes("Python")&&o.push({name:"main.py",path:"main.py",type:"code",language:"python",content:`#!/usr/bin/env python3
"""
Generated Python application for: ${e}
"""

import sys
import os
from typing import Optional

def main():
    """Main function for the generated application."""
    print("Generated Python application")
    print(f"Prompt: {prompt}")
    
    # Add your implementation here
    pass

if __name__ == "__main__":
    main()`}),(r?.includes("Node")||n?.includes("React"))&&o.push({name:"package.json",path:"package.json",type:"config",language:"json",content:JSON.stringify({name:"generated-project",version:"1.0.0",dependencies:n?.includes("React")?{react:"^18.0.0","react-dom":"^18.0.0",typescript:"^4.0.0"}:{}},null,2)})),("docs"===t||"both"===t)&&o.push({name:"README.md",path:"README.md",type:"docs",language:"markdown",content:`# Generated Project

This project was generated based on the prompt: "${e}"

## Description

${"both"===t?"This project includes both code and documentation.":"code"===t?"This project includes generated code.":"This project includes documentation."}

## Technology Stack

${r?`- Language: ${r}`:""}
${n?`- Framework: ${n}`:""}

## Getting Started

### Installation

\`\`\`bash
# Add installation instructions here
\`\`\`

### Usage

\`\`\`bash
# Add usage instructions here
\`\`\`

## Features

- Generated based on your requirements
- ${r||"Custom"} implementation
- Ready to use

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.`}),{files:o,tokensUsed:Math.floor(1e3*Math.random())+500,cost:Math.floor(50*Math.random())+10}}async function _(e){try{let e=await (0,c.I)();if(!e?.user?.id)return i.Z.json({error:"Unauthorized"},{status:401});let t=await d.db.select().from(l.ed).where((0,u.eq)(l.ed.userId,e.user.id)).orderBy((0,p.C)(l.ed.createdAt)).limit(50);return i.Z.json({generations:t})}catch(e){return console.error("Get generations API error:",e),i.Z.json({error:"Internal server error"},{status:500})}}let y=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/generate/route",pathname:"/api/generate",filename:"route",bundlePath:"app/api/generate/route"},resolvedPagePath:"C:\\Users\\bunny\\CascadeProjects\\code-doc-gen\\app\\api\\generate\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:N,staticGenerationAsyncStorage:A,serverHooks:w,headerHooks:L,staticGenerationBailout:j}=y,k="/api/generate/route";function x(){return(0,s.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:A})}},4118:(e,t,r)=>{r.r(t),r.d(t,{GET:()=>d,POST:()=>d,authOptions:()=>i});var n=r(81355),a=r.n(n),o=r(10375),s=r(79390);let i={providers:[(0,o.Z)({clientId:process.env.GOOGLE_CLIENT_ID||"",clientSecret:process.env.GOOGLE_CLIENT_SECRET||""}),(0,s.Z)({clientId:process.env.DISCORD_CLIENT_ID||"",clientSecret:process.env.DISCORD_CLIENT_SECRET||""})],callbacks:{session:async({session:e,token:t})=>(e.user.id=t.sub,e)},secret:process.env.NEXTAUTH_SECRET,pages:{signIn:"/login"}},d=a()(i)},3205:(e,t,r)=>{r.d(t,{I:()=>o});var n=r(49605),a=r(4118);async function o(){return await (0,n.getServerSession)(a.authOptions)}},47033:(e,t,r)=>{r.d(t,{db:()=>i});var n=r(37939),a=r(25669);let o=process.env.DATABASE_URL;if(!o)throw Error("DATABASE_URL is not set");let s=(0,a.Z)(o),i=(0,n.t)(s)},12030:(e,t,r)=>{r.d(t,{QZ:()=>g,ed:()=>m,j_:()=>_,q:()=>f,zd:()=>h});var n=r(96155),a=r(49703),o=r(81930),s=r(82561),i=r(56664),d=r(6402),l=r(70573),u=r(75887),p=r(42310);let c=(0,n.af)("users",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),name:(0,o.L7)("name",{length:255}),email:(0,o.L7)("email",{length:255}).notNull().unique(),emailVerified:(0,s.AB)("email_verified"),image:(0,o.L7)("image",{length:255}),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()});(0,n.af)("accounts",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),userId:(0,a.Vj)("user_id").notNull().references(()=>c.id,{onDelete:"cascade"}),type:(0,o.L7)("type",{length:50}).notNull(),provider:(0,o.L7)("provider",{length:50}).notNull(),providerAccountId:(0,o.L7)("provider_account_id",{length:255}).notNull(),refresh_token:(0,i.fL)("refresh_token"),access_token:(0,i.fL)("access_token"),expires_at:(0,d._L)("expires_at"),token_type:(0,o.L7)("token_type",{length:50}),scope:(0,i.fL)("scope"),id_token:(0,i.fL)("id_token"),session_state:(0,i.fL)("session_state"),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()}),(0,n.af)("sessions",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),sessionToken:(0,o.L7)("session_token",{length:255}).notNull().unique(),userId:(0,a.Vj)("user_id").notNull().references(()=>c.id,{onDelete:"cascade"}),expires:(0,s.AB)("expires").notNull(),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()});let f=(0,n.af)("projects",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),userId:(0,a.Vj)("user_id").notNull().references(()=>c.id,{onDelete:"cascade"}),name:(0,o.L7)("name",{length:255}).notNull(),description:(0,i.fL)("description"),type:(0,o.L7)("type",{length:50}).notNull(),language:(0,o.L7)("language",{length:100}),framework:(0,o.L7)("framework",{length:100}),prompt:(0,i.fL)("prompt").notNull(),settings:(0,l.JB)("settings"),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()}),g=(0,n.af)("files",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),projectId:(0,a.Vj)("project_id").notNull().references(()=>f.id,{onDelete:"cascade"}),name:(0,o.L7)("name",{length:255}).notNull(),path:(0,o.L7)("path",{length:500}).notNull(),type:(0,o.L7)("type",{length:50}).notNull(),language:(0,o.L7)("language",{length:100}),content:(0,i.fL)("content").notNull(),size:(0,d._L)("size").notNull(),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()}),m=(0,n.af)("generations",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),userId:(0,a.Vj)("user_id").notNull().references(()=>c.id,{onDelete:"cascade"}),projectId:(0,a.Vj)("project_id").references(()=>f.id,{onDelete:"cascade"}),prompt:(0,i.fL)("prompt").notNull(),type:(0,o.L7)("type",{length:50}).notNull(),settings:(0,l.JB)("settings"),status:(0,o.L7)("status",{length:50}).notNull().default("pending"),tokensUsed:(0,d._L)("tokens_used").default(0),cost:(0,d._L)("cost").default(0),error:(0,i.fL)("error"),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull(),completedAt:(0,s.AB)("completed_at")}),h=(0,n.af)("templates",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),name:(0,o.L7)("name",{length:255}).notNull(),description:(0,i.fL)("description"),category:(0,o.L7)("category",{length:100}).notNull(),language:(0,o.L7)("language",{length:100}),difficulty:(0,o.L7)("difficulty",{length:50}).notNull(),prompt:(0,i.fL)("prompt").notNull(),settings:(0,l.JB)("settings"),hasCode:(0,u.O7)("has_code").default(!0),hasDocs:(0,u.O7)("has_docs").default(!0),downloads:(0,d._L)("downloads").default(0),rating:(0,d._L)("rating").default(0),isPublic:(0,u.O7)("is_public").default(!0),isOfficial:(0,u.O7)("is_official").default(!1),createdBy:(0,a.Vj)("created_by").references(()=>c.id),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()}),_=(0,n.af)("usage",{id:(0,a.Vj)("id").defaultRandom().primaryKey(),userId:(0,a.Vj)("user_id").notNull().references(()=>c.id,{onDelete:"cascade"}),date:(0,s.AB)("date").notNull(),generations:(0,d._L)("generations").default(0),tokensUsed:(0,d._L)("tokens_used").default(0),cost:(0,d._L)("cost").default(0),createdAt:(0,s.AB)("created_at").defaultNow().notNull(),updatedAt:(0,s.AB)("updated_at").defaultNow().notNull()});(0,p.fC)(c),(0,p.IO)(c),(0,p.fC)(f),(0,p.IO)(f),(0,p.fC)(g),(0,p.IO)(g),(0,p.fC)(m),(0,p.IO)(m),(0,p.fC)(h),(0,p.IO)(h),(0,p.fC)(_),(0,p.IO)(_)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[638,206,721,279,754],()=>r(42415));module.exports=n})();