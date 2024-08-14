function main(params) {
  function createProxyGroup(name, type, icon, proxies) {return {name,type,icon,interval: 300,tolerance: type === "url-test" ? 20 : undefined,timeout: type === "url-test" ? 2000 : undefined,proxies: proxies.length > 0 ? proxies : ["DIRECT"]};}
  function getProxiesByRegex(params, regex) {
    return params.proxies
      .filter(e => regex.test(e.name))
      .map(e => e.name);
  }
  const regions = [
    { name: "Auto", regex: /.*/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Urltest.png", type: "url-test" },
    { name: "HongKong", regex: /港|香港|🇭🇰|HK|Hong Kong/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png" },
    { name: "TaiWan", regex: /台|台湾|新北|彰化|TW|Taiwan|🇹🇼/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png" },
    { name: "Singapore", regex: /新加坡|狮城|SG|Singapore|🇸🇬/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png" },
    { name: "Japan", regex: /日|日本|🇯🇵|川日|东京|大阪|泉日|埼玉|沪日|深日|[^-]日|JP|Japan/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png" },
    { name: "America", regex: /美|美国|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png" },
    { name: "Others", regex: /^(?:(?!港|香港|🇭🇰|HK|Hong Kong|台|台湾|新北|彰化|TW|Taiwan|日|日本|🇯🇵|川日|东京|大阪|泉日|埼玉|沪日|深日|[^-]日|JP|Japan|韩|韓|韩国|🇰🇷|KR|Korea|KOR|首尔|新加坡|🇸🇬|坡|狮城|SG|Singapore|美|美国|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States).)*$/, icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/XD.png" }
  ];
  const proxyGroups = regions.map(region =>
    createProxyGroup(region.name, region.type || "url-test", region.icon, getProxiesByRegex(params, region.regex))
  );
  const finalGroup = {
    name: "Select",
    type: "select",
    proxies: [ "Auto" ,"DIRECT", "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"],
    icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Static.png"
  };
  const predefinedGroups = [
    { name: "AI", type: "select", proxies: [  "Auto","America", "Japan", "Singapore", "TaiWan", "HongKong", "Others"], icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png" },
    { name: "YouTube", type: "select", proxies: [ "Auto",   "HongKong", "TaiWan", "Singapore", "Japan", "America", "Others"], icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/YouTube.png" }
  ];
  params["proxy-groups"] = [finalGroup, ...proxyGroups, ...predefinedGroups];
params.rules = ["DOMAIN-SUFFIX,whatshub.top,DIRECT", "GEOSITE,Bing,AI","GEOSITE,Openai,AI","GEOSITE,Youtube,YouTube","GEOSITE,CN,DIRECT","MATCH,Select"];
  return params;
}
