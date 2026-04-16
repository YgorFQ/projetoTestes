// @ts-nocheck
/* col-groups.js — Motor + dados dos grupos (gerado pelo SenkoLib) */
var ColGroups = (function () {
  var _g = [];
  function _k(s) { return (s||"").toLowerCase().trim(); }
  return {
    register: function(arr) {
      arr.forEach(function(g) {
        if (!g||!g.slug) return;
        var k=_k(g.slug);
        if (!_g.some(function(x){return _k(x.slug)===k;})) {
          _g.push({slug:k,name:g.name||g.slug,color:g.color||"#888"});
        }
      });
    },
    getAll:    function() { return _g.slice(); },
    getBySlug: function(s) { var k=_k(s); for(var i=0;i<_g.length;i++) if(_k(_g[i].slug)===k) return _g[i]; return null; },
    add:       function(o) { if(!o||!o.slug) return; var k=_k(o.slug); _g=_g.filter(function(g){return _k(g.slug)!==k;}); _g.push({slug:k,name:o.name||o.slug,color:o.color||"#888"}); },
    remove:    function(s) { var k=_k(s); _g=_g.filter(function(g){return _k(g.slug)!==k;}); },
  };
})();
ColGroups.register([
  { slug: 'efacil', name: 'eFácil', color: '#7F77DD' },
  { slug: 'efacil', name: 'eFácil', color: '#7F77DD' },
  { slug: 'jogue-na-minha-papae', name: 'Jogue na minha papae', color: '#3B6D11' },
  { slug: 'awddsssss', name: 'awddsssss', color: '#7F77DD' },
]);
