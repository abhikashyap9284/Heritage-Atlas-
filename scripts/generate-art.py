"""Create bespoke, royalty-free vector illustrations. Artistic only, not documentary reconstructions."""
from pathlib import Path
out=Path(__file__).resolve().parent.parent/'public'/'images';out.mkdir(exist_ok=True,parents=True)

def svg(inner,bg1='#d6a986',bg2='#60746c',dark='#4f453e', accent='#f6dfb6', label=''):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="Original conceptual Indian heritage architectural illustration"><defs><linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{bg1}"/><stop offset="1" stop-color="{bg2}"/></linearGradient><linearGradient id="stone" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="{accent}"/><stop offset="1" stop-color="{dark}"/></linearGradient><linearGradient id="shadow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{dark}"/><stop offset="1" stop-color="#1c312f"/></linearGradient><pattern id="brick" width="46" height="20" patternUnits="userSpaceOnUse"><path d="M0 20H46 M23 0V20" fill="none" stroke="#3b3230" stroke-width=".7" opacity=".22"/></pattern><filter id="blur"><feGaussianBlur stdDeviation="28"/></filter></defs><rect width="1200" height="900" fill="url(#sky)"/><circle cx="925" cy="190" r="155" fill="#fff2d3" opacity=".46"/><circle cx="925" cy="190" r="191" fill="none" stroke="#fff7e7" opacity=".3"/><g fill="#ffffff" opacity=".16"><ellipse cx="235" cy="160" rx="180" ry="25" filter="url(#blur)"/><ellipse cx="1070" cy="320" rx="170" ry="30" filter="url(#blur)"/></g><path d="M0 660Q260 590 510 642T1200 630V900H0Z" fill="#53654c" opacity=".47"/><path d="M0 740Q300 700 580 760T1200 705V900H0Z" fill="#314d45" opacity=".85"/>{inner}<rect y="847" width="1200" height="53" fill="#253e37" opacity=".55"/><path d="M80 92q14 -20 28 0q14 -20 28 0 M190 147q10 -14 20 0q10 -14 20 0 M970 98q9 -12 18 0q9 -12 18 0" fill="none" stroke="#172f2e" opacity=".54" stroke-width="3" stroke-linecap="round"/><path d="M0 853H1200" stroke="#e9ccab" opacity=".36" stroke-width="3"/></svg>'''

def arch(x,y,w,h,stroke='#d5b38e'):
 return f'<path d="M{x} {y+h}V{y+h*.40}Q{x} {y} {x+w/2} {y-7}Q{x+w} {y} {x+w} {y+h*.40}V{y+h}Z" fill="#27332f" stroke="{stroke}" stroke-width="4"/>'

def dome(x,y,r,col='#eee0c3'):
 return f'<path d="M{x-r} {y}Q{x-r*.85} {y-r*.9} {x} {y-r*1.2}Q{x+r*.85} {y-r*.9} {x+r} {y}Z" fill="{col}" stroke="#756457" stroke-width="5"/><path d="M{x} {y-r*1.15}v{-r*.24}" stroke="#e0bf91" stroke-width="5"/><circle cx="{x}" cy="{y-r*1.4}" r="6" fill="#f7d9a4"/>'

def minaret(x,y,h,scale=1):
 w=34*scale
 return f'<g><rect x="{x-w/2}" y="{y-h}" width="{w}" height="{h}" fill="#ead9bc" stroke="#89765d" stroke-width="3"/><rect x="{x-w/2-8*scale}" y="{y-h*.73}" width="{w+16*scale}" height="{9*scale}" fill="#9f805f"/><rect x="{x-w/2-8*scale}" y="{y-h*.33}" width="{w+16*scale}" height="{9*scale}" fill="#9f805f"/><path d="M{x-w*.72} {y-h}q{w*.72} {-50*scale} {w*1.44} 0z" fill="#dbbd90"/><path d="M{x} {y-h-29*scale}v{-26*scale}" stroke="#755847" stroke-width="3"/></g>'

def taj():
 body='<ellipse cx="590" cy="785" rx="450" ry="55" fill="#162c2b" opacity=".29"/><rect x="190" y="714" width="810" height="65" fill="#dfc7a5" stroke="#927759" stroke-width="6"/><rect x="284" y="466" width="630" height="250" fill="url(#stone)" stroke="#9e826b" stroke-width="7"/><rect x="274" y="453" width="650" height="18" fill="#f1e2ca"/>'
 body += '<rect x="420" y="348" width="360" height="125" fill="#e8d9c2"/><rect x="400" y="325" width="400" height="29" fill="#bda58b"/>'+dome(600,327,155)
 for x in [323,465,608,750,857]:body+=arch(x,520,76,190)
 for x in [216,984]:body+=minaret(x,739,383,1.25)
 for x in [340,860]:body+=dome(x,441,57,'#f0dfc9')
 return body

def fort(kind='fort'):
 body='<ellipse cx="620" cy="769" rx="540" ry="80" fill="#152d28" opacity=".33"/><path d="M130 745V460H1070V745Z" fill="#ab694e" stroke="#e2ac83" stroke-width="6"/><path d="M130 472H1070" stroke="#e3ac86" stroke-width="16"/><path d="M130 469H1070V745H130Z" fill="url(#brick)"/><rect x="380" y="365" width="440" height="120" fill="#b77551"/><path d="M368 365h465" stroke="#e5b18d" stroke-width="14"/>'
 for x in [155,290,410,535,660,780,920,1050]:body+=f'<rect x="{x-28}" y="439" width="56" height="38" fill="#a35d47"/><rect x="{x-24}" y="436" width="48" height="7" fill="#e7b187"/>'
 for x in [200,1000]:body+=f'<rect x="{x-75}" y="326" width="150" height="400" rx="11" fill="#ac6c50" stroke="#d69c71" stroke-width="6"/><rect x="{x-83}" y="321" width="166" height="19" fill="#dfae84"/>'+dome(x,323,68,'#bd7956')
 body+=arch(520,538,163,205,'#e6ae85')
 for x in [300,785]:body+=arch(x,526,75,123)
 if kind=='fatehpur':body+='<path d="M380 365L600 138L820 365Z" fill="#bd7652" stroke="#ecc29e" stroke-width="12"/>'+arch(535,254,130,110)
 return body

def minar():
 body='<ellipse cx="640" cy="773" rx="500" ry="57" fill="#132c2a" opacity=".3"/><rect x="180" y="734" width="870" height="37" fill="#b48865"/><path d="M445 742L512 161H673L736 742Z" fill="#aa6b55" stroke="#e1b58d" stroke-width="9"/>'
 for y in [243,333,421,501,591,668]:body+=f'<path d="M{502-(y-161)*.115} {y}H{680+(y-161)*.08}" stroke="#e6b488" stroke-width="19"/>'
 for i in range(8):
  x=523+i*17
  body+=f'<path d="M{x} 178L{x+(i-4)*5} 733" stroke="#754839" stroke-width="2" opacity=".65"/>'
 body+='<path d="M505 161L512 126H672L682 161Z" fill="#d7a881"/><rect x="530" y="112" width="130" height="20" fill="#815143"/>'
 for x in [190,365,875,1020]:body+=f'<path d="M{x-68} 744V620L{x} 560L{x+68} 620V744Z" fill="#c09c73"/>'+arch(x-30,658,60,85)
 return body

def garden():
 body='<ellipse cx="610" cy="760" rx="510" ry="60" fill="#20382f" opacity=".35"/><rect x="200" y="479" width="800" height="281" fill="#aa6853" stroke="#dba88d" stroke-width="7"/><rect x="365" y="380" width="470" height="110" fill="#b57a62"/><rect x="349" y="370" width="499" height="18" fill="#e0bda0"/>'+dome(600,381,176,'#e4c9ae')
 for x in [220,325,430,535,650,755,860,965]:body+=arch(x,564,55,135)
 for x in [275,924]:body+=dome(x,478,75,'#d2a17d')
 for x in [430,770]:body+=minaret(x,479,135,.75)
 body+='<path d="M580 760L560 900M620 760L640 900" stroke="#d2b38b" stroke-width="5"/><path d="M0 817Q260 780 540 816" fill="none" stroke="#e4ca9e" stroke-width="5"/>'
 return body

art={
'hero.svg':svg(taj(),'#bd916d','#3b544d','#907869','#f1e2cc'),
'agra.svg':svg(taj(),'#d4ab81','#566d67','#87756a','#f2e3cf'),
'delhi.svg':svg(fort(),'#c88f75','#465d58','#b37d66','#d9ac87'),
'taj.svg':svg(taj(),'#d6ac88','#78928b','#907869','#fbefdb'),
'fort.svg':svg(fort(),'#dca279','#6a776b','#b66c50','#dfa986'),
'fatehpur.svg':svg(fort('fatehpur'),'#bc8967','#526b64','#a35f43','#e3a879'),
'redfort.svg':svg(fort(),'#b9856d','#617b70','#ae6a4b','#dfa47e'),
'humayun.svg':svg(garden(),'#b9a18c','#657d75','#ab7b65','#e9caaa'),
'qutb.svg':svg(minar(),'#c3a17d','#5d756d','#af7059','#eac39a'),
'experience.svg':svg(fort('fatehpur'),'#a58d75','#375d50','#bc866a','#eac19d'),
'auth.svg':svg(garden(),'#917e69','#2a4c42','#b18a70','#d7bea7')}
for name,content in art.items(): (out/name).write_text(content,encoding='utf-8')
print('Generated',len(art),'original illustrative SVGs in',out)
