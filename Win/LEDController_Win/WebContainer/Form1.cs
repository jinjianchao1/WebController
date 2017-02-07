using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace WebContainer
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
            Application.Exit();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            //if (!RegSoftwareHelper.IsInstallToolbox())
            //{
            //    MessageBox.Show("检测到没有安装生产工具软件,请安装后重新启动");
            //    return;
            //}
            //LEDHelper.ImportClientDataToServerSqliteDB("", "");

            
        }
    }
}
