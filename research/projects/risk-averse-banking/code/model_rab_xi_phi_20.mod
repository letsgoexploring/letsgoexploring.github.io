var y,yf,c,h,s,lam,r,rn,x1,x2,ptil,pi,w,x,k,i,rk,q,qbar,wbar,n,ztil,gam,gamp,ups,upsp,lamtil,ce,z,g,v,sigmaw,sigmas,chi,b,mex,rd,cap_phi,rbar;

varexo e_z,e_g,e_v,e_sw,e_ss;

parameters delta,alpha,h_ss,pi_ss,beta,i_yf_ratio,g_yf_ratio,k_n_ratio,rd_ss,theta,epsilon,omega,psi,default_rate,g_ss,req_res_ratio,mu,gamma,xi_phi,mux,zetad,zetah,i_ss,k_ss,yf_ss,rho_r,phi_pi,phi_y,sigmaw_ss,rho_z,rho_g,rho_v,rho_sw,rho_ss,sig_z,sig_g,sig_v,sig_s,eta_s,sig_sw,sig_ss;

delta = 0.0272530675872;
alpha = 0.35;
h_ss = 0.2043997669;
pi_ss = 1.00852885905;
beta = 0.996636056867;
i_yf_ratio = 0.169619433931;
g_yf_ratio = 0.204574187637;
k_n_ratio = 1.28781211408;
rd_ss = 1.01097575689;
theta = 0.8;
epsilon = 5.0;
omega = 0.984615384615;
psi = 0.25;
default_rate = 0.0075;
g_ss = 0.113872055312;
req_res_ratio = 0.01;
mu = 0.489194939953;
gamma = 0.977560339284;
xi_phi = 20.0;
mux = 8.70977976512e-05;
zetad = 0.00260356397789;
zetah = 3.90535029768;
i_ss = 0.0944152035291;
k_ss = 3.46438811804;
yf_ss = 0.556629634595;
rho_r = 0.9;
phi_pi = 1.5;
phi_y = 0.125;
sigmaw_ss = 0.556745203753;
rho_z = 0.791761294777;
rho_g = 0.892987399145;
rho_v = 0.0;
rho_sw = 0.85;
rho_ss = 0.9;
sig_z = 0.00671715924337;
sig_g = 0.0140849881852;
sig_v = 0.001225;
sig_s = 0.119;
eta_s = 1.0;
sig_sw = 0.028;
sig_ss = 1.0;

model;
y = exp(z)*k^alpha*h^((1-alpha)*omega);
yf = y / s;
k = (1/(1-psi) *(i(-1)/k(-1))^(1-psi) *delta^psi - psi/(1-psi)*delta)*k(-1) + (1-delta)*k(-1);
q = (i/k(-1))^psi*delta^-psi;
rk = (alpha*y/x/k+(1-delta)*qbar)/(q(-1));
0 = q*(1/(1-psi) *(i/k)^(1-psi) *delta^psi - psi/(1-psi)*delta) - i/k - qbar + q;
(1-alpha)*omega *y / h = x * w;
n = gamma*(1-gam(-1))*rk(-1)*q(-2)*k(-1) + (1-alpha)*(1-omega)*exp(z(-1))*k(-1)^alpha*h^((1-alpha)*omega)/x(-1);
lam = c^-1;
ce = (1-gamma)*(1-gam)*rk*q(-1)*k;
yf = c + ce +i+mu*ups*rk*q(-1)*k+ exp(g);
lam = beta*r*lam(1);
w*c^-1 = zetah*(1-h)^-1;
rn = r*pi(1);
chi = (gam - mu * ups)*rk*pi*q(-1)*k;
b = q*k(1)-n(1);
((q*k(1) - n(1) + mex)/(1-req_res_ratio)) = zetad*c*rn/(rn-rd);
(mex/pi(1)*(1-rd)/(1-req_res_ratio)*xi_phi*exp(-xi_phi*cap_phi(1)) + mux) = 0;
cap_phi = (chi - (rd(-1) - req_res_ratio)/(1-req_res_ratio)*b(-1) + (1-rd(-1))/(1-req_res_ratio)*mex(-1))/pi;
1 = theta * pi^(-1+epsilon) + (1-theta)*ptil^(1-epsilon);
x1 = ptil^(-1-epsilon)*yf/x + theta*beta*(lam(1)/lam*pi(1)^(epsilon)*(ptil/ptil(1))^(-1-epsilon)*x1(1));
x2 = ptil^(-epsilon)*yf + theta*beta*(lam(1)/lam*pi(1)^(epsilon-1)*(ptil/ptil(1))^(-epsilon)*x2(1));
epsilon/(epsilon-1)*x1 = x2;
s = (1-theta)*ptil^(-epsilon) + theta*pi^(epsilon)*s(-1);
ztil = (log(wbar) + sigmaw^2/2)/sigmaw;
gam = 0.5*(1 + erf((ztil-sigmaw)/2^.5)) + wbar * 0.5*(1-erf(ztil/2^.5));
gamp = 0.5*(1 - erf(ztil/2^.5));
ups = 0.5*(1+erf((ztil-sigmaw)/2^.5));
upsp = 1/(sigmaw*(2*3.14159265358979)^.5)*exp(-(ztil)^2/2);
(1-gam(1))*rk(1) - gamp(1)*rbar*n(1)/q/k(1)/pi(1) + lamtil * ( xi_phi*exp(-xi_phi*cap_phi(1))*((gamp(1)-mu*upsp(1))*rbar*n(1)/q/k(1)/pi(1) + (gam(1) - mu*ups(1))*rk(1) - (rd-req_res_ratio)/pi(1)/(1-req_res_ratio) )) = 0;
gamp(1)/pi(1) - lamtil*xi_phi*exp(-xi_phi*cap_phi(1))*(gamp(1) - mu*upsp(1))/pi(1) = 0;
exp(-xi_phi*cap_phi(1)) = exp(-xi_phi*((1-rd)*mex/(1-req_res_ratio)/pi(1)));
wbar*pi*rk*q(-1)*k = rbar(-1)*(q(-1)*k - n);
log(rn) = (1-rho_r)*log(pi_ss/beta) + rho_r * log(rn(-1))+ phi_pi*log(pi) - phi_pi*log(pi_ss) + phi_y*log(yf) - phi_y*log(yf_ss) + v;
z = rho_z * z(-1) + e_z;
g = (1-rho_g)*log(g_ss) + (1-rho_g)*g_ss + rho_g *g(-1) + e_g;
v = rho_v * v(-1) + e_v;
log(sigmaw) = (1-rho_sw)*log(sigmaw_ss) + rho_sw*log(sigmaw(-1)) + exp(sigmas) * e_sw;
sigmas = (1-rho_ss)*sig_s + rho_ss*sigmas(-1) + eta_s*e_ss;
end;

initval;
y = 0.559212335355;
yf = 0.556629634595;
c = 0.284280366028;
h = 0.2043997669;
s = 1.00463989087;
lam = 3.5176541172;
r = 1.00337529744;
rn = 1.01193294393;
x1 = 2.11113718291;
x2 = 2.63892147863;
ptil = 1.037888215;
pi = 1.00852885905;
w = 1.3954425425;
x = 1.25477067817;
k = 3.46438811804;
i = 0.0944152035291;
rk = 1.01777194939;
q = 1.0;
qbar = 1.0;
wbar = 0.221087221969;
n = 2.69013474881;
ztil = -2.43237905905;
gam = 0.220827959414;
gamp = 0.99250000001;
ups = 0.00139889160803;
upsp = 0.0371970847004;
lamtil = 0.0509293918517;
ce = 0.0616490890842;
z = 0.0;
g = 0.113872055312;
v = 0.0;
sigmaw = 0.556745203753;
sigmas = 1.0;
chi = 0.782837224522;
b = 0.774253369221;
mex = 0.000396121487318;
rd = 1.01097575689;
cap_phi = -4.35451063079e-06;
rbar = 1.01542040521;
end;

vcov = [
    4.512022830079822e-05 0 0 0 0;
    0 0.00019838689217738502 0 0 0;
    0 0 1.500625e-06 0 0;
    0 0 0 0.0007840000000000001 0;
    0 0 0 0 1.0;
    ];

order = 3;