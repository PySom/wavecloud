using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WaveCloud.Data;
using WaveCloud.Models;
using WaveCloud.Repository;
using WaveCloud.Repository.Generics;
using WaveCloud.Services;

namespace WaveCloud
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContextPool<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration[AppConstant.Secret]));
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //Validate credentials
                        ValidateIssuer = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true,
                        //set valid params
                        ValidIssuer = Configuration[AppConstant.Issuer],
                        ValidAudience = Configuration[AppConstant.Audience],
                        IssuerSigningKey = securityKey
                    };
                });
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddAutoMapper(typeof(Startup));
            services.AddTransient<IModelManager<ApplicationUser>, ModelManager<ApplicationUser>>();
            services.AddTransient<AccountRepository>();
            services.AddTransient<AuthRepository>();
            services.AddTransient<IModelManager<Beat>, ModelManager<Beat>>();
            services.AddTransient<IModelManager<Cart>, ModelManager<Cart>>();
            services.AddTransient<IModelManager<Customer>, ModelManager<Customer>>();
            services.AddTransient<IModelManager<MusicFrequency>, ModelManager<MusicFrequency>>();
            services.AddTransient<IModelManager<Rating>, ModelManager<Rating>>();
            services.AddTransient<IModelManager<Genre>, ModelManager<Genre>>();
            services.AddTransient<IModelManager<Studio>, ModelManager<Studio>>();
            services.AddTransient<IImageService, ImageService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}

