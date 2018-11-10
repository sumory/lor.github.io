webpackJsonp([6],{768:function(n,s){n.exports={content:["article",["blockquote",["p","lor\u5bf9\u6784\u5efaRESTful\u98ce\u683c\u5e94\u7528\u63d0\u4f9b\u4e86\u826f\u597d\u652f\u6301\u3002"]],["pre",{lang:"lua",highlighted:'<span class="token keyword">local</span> lor <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"lor.index"</span><span class="token punctuation">)</span>\n<span class="token keyword">local</span> app <span class="token operator">=</span> <span class="token function">lor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">local</span> userRouter <span class="token operator">=</span> lor<span class="token punctuation">:</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\nuserRouter<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/find/:id"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    <span class="token keyword">local</span> query_id <span class="token operator">=</span> <span class="token function">tonumber</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>\n    res<span class="token punctuation">:</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token string">"user/info"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        id <span class="token operator">=</span> query_id<span class="token punctuation">,</span>\n        name <span class="token operator">=</span> <span class="token string">"user"</span> <span class="token operator">..</span> query_id<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\nuserRouter<span class="token punctuation">:</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"/delete"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    <span class="token keyword">local</span> id <span class="token operator">=</span> req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id\n    res<span class="token punctuation">:</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token string">"&lt;span>succeed to delete user&lt;/span>"</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\nuserRouter<span class="token punctuation">:</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"/modify/:id"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    <span class="token keyword">local</span> id <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id\n    <span class="token keyword">local</span> new_name <span class="token operator">=</span> req<span class="token punctuation">.</span>query<span class="token punctuation">.</span>new_name\n\n    res<span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"succeed to modify user["</span> <span class="token operator">..</span> id <span class="token operator">..</span> <span class="token string">"]"</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\nuserRouter<span class="token punctuation">:</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">"/create"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    <span class="token keyword">local</span> id <span class="token operator">=</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>id\n    <span class="token keyword">local</span> name <span class="token operator">=</span> req<span class="token punctuation">.</span>body<span class="token punctuation">.</span>name\n\n    <span class="token keyword">return</span> res<span class="token punctuation">:</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        success <span class="token operator">=</span> <span class="token keyword">true</span><span class="token punctuation">,</span>\n        msg <span class="token operator">=</span> <span class="token string">"succeed to create new user."</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token function">userRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    res<span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"Hello world!"</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">erroruse</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span>\n    <span class="token keyword">if</span> req<span class="token punctuation">:</span><span class="token function">is_found</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">~=</span> <span class="token keyword">true</span> <span class="token keyword">then</span>\n        res<span class="token punctuation">:</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"404! page not found!"</span><span class="token punctuation">)</span>\n    <span class="token keyword">else</span>\n        ngx<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ngx<span class="token punctuation">.</span>ERR<span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n        res<span class="token punctuation">:</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"unknown error"</span><span class="token punctuation">)</span>\n    <span class="token keyword">end</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>'},["code",'local lor = require("lor.index")\nlocal app = lor()\nlocal userRouter = lor:Router()\n\nuserRouter:get("/find/:id", function(req, res, next)\n    local query_id = tonumber(req.params.id)\n    res:render("user/info", {\n        id = query_id,\n        name = "user" .. query_id,\n    })\nend)\n\nuserRouter:delete("/delete", function(req, res, next)\n    local id = req.query.id\n    res:html("<span>succeed to delete user</span>")\nend)\n\nuserRouter:put("/modify/:id", function(req, res, next)\n    local id = req.params.id\n    local new_name = req.query.new_name\n\n    res:send("succeed to modify user[" .. id .. "]")\nend)\n\nuserRouter:post("/create", function(req, res, next)\n    local id = req.body.id\n    local name = req.body.name\n\n    return res:json({\n        success = true,\n        msg = "succeed to create new user."\n    })\nend)\n\napp:use("user", userRouter())\n\napp:get("/", function(req, res, next)\n    res:send("Hello world!")\nend)\n\napp:erroruse(function(err, req, res, next)\n    if req:is_found() ~= true then\n        res:status(404):send("404! page not found!")\n    else\n        ngx.log(ngx.ERR, err)\n        res:status(500):send("unknown error")\n    end\nend)\n\napp:run()']]],meta:{title:"RESTful \u793a\u4f8b",type:"\u57fa\u7840",order:4,filename:"docs/restful.zh-CN.md"},toc:["ul"]}}});