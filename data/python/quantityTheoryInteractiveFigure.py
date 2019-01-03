import matplotlib.pyplot as plt
import numpy as np
import mpld3
import pandas as pd

data = pd.read_csv('../csv/qtyTheoryData.csv')
dataL = pd.read_csv('../csv/qtyTheoryDataL.csv')
dataM = pd.read_csv('../csv/qtyTheoryDataM.csv')
dataH = pd.read_csv('../csv/qtyTheoryDataH.csv')


scale = 0.8
w = 8*scale
h = 7*scale
fig, ax = plt.subplots(subplot_kw=dict(axisbg='#EEEEEE'),figsize=(w,h))

x = np.arange(-10,10,0.001)
ybar = np.mean(data['gdp growth'])
y = x -ybar

ax.plot(x,y)
scatterL = ax.scatter(dataL['money growth'],dataL['inflation'],
                     s=125,
                     color='red',
                     alpha=0.3,
                     cmap=plt.cm.jet)
scatterM = ax.scatter(dataM['money growth'],dataM['inflation'],
                     s=125,
                     color='green',
                     alpha=0.3,
                     cmap=plt.cm.jet)
scatterH = ax.scatter(dataH['money growth'],dataH['inflation'],
                     s=125,
                     color='blue',
                     alpha=0.3,
                     cmap=plt.cm.jet)
ax.grid(color='white', linestyle='solid')

# ax.set_title("This is a figure that containesa. dfa is the distance between asdfn \n ads f adnnsd anfn da ", size=20)
ax.set_xlabel('money growth', fontsize=14)
ax.set_ylabel('inflation', fontsize=14)
ax.set_xlim([-0.2,1.4])
ax.set_ylim([-0.2,1.4])
# ax.tick_params(axis='x', labelsize=1)
ax.xaxis.labelpad = 5
ax.yaxis.labelpad = 5


labelsL = ['<h5 id = lab>{title}</h4>'.format(title=c) for c in dataL['country']]
labelsM = ['<h5 id = lab>{title}</h4>'.format(title=c) for c in dataM['country']]
labelsH = ['<h5 id = lab>{title}</h4>'.format(title=c) for c in dataH['country']]

tooltipL = mpld3.plugins.PointHTMLTooltip(scatterL, labels=labelsL)
tooltipM = mpld3.plugins.PointHTMLTooltip(scatterM, labels=labelsM)
tooltipH = mpld3.plugins.PointHTMLTooltip(scatterH, labels=labelsH)
mpld3.plugins.connect(fig, tooltipL)
mpld3.plugins.connect(fig, tooltipM)
mpld3.plugins.connect(fig, tooltipH)

# mpld3.show()

plt.tight_layout()
# mpld3.save_html(fig,'test.html')
htmlString = mpld3.fig_to_html(fig,figid='figMoneyGrowthInflation')



for n in range(len(htmlString)):
	if htmlString[n:n+6] == "</div>":
		S = htmlString[n+16:-9]
		break
		
f = open('../figScript.js', 'w')
f.write(S)
f.close()