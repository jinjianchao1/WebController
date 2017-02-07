using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Threading;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Web;

namespace AutoProg
{
    public partial class Form1 : Form
    {
        Thread thread = null;
        bool isRun = false;
        string url = "http://localhost/ledcontroller/API/ClientAPI.php?tag=2";

        private string escape(string s)
        {
            StringBuilder sb = new StringBuilder();
            byte[] byteArr = System.Text.Encoding.Unicode.GetBytes(s);

            for (int i = 0; i < byteArr.Length; i += 2)
            {
                sb.Append("%u");
                sb.Append(byteArr[i + 1].ToString("X2"));//把字节转换为十六进制的字符串表现形式  

                sb.Append(byteArr[i].ToString("X2"));
            }
            return sb.ToString();

        }

        private string unescape(string s)
        {

            string str = s.Remove(0, 2);//删除最前面两个＂%u＂  
            string[] strArr = str.Split(new string[] { "%u" }, StringSplitOptions.None);//以子字符串＂%u＂分隔  
            byte[] byteArr = new byte[strArr.Length * 2];
            for (int i = 0, j = 0; i < strArr.Length; i++, j += 2)
            {
                byteArr[j + 1] = Convert.ToByte(strArr[i].Substring(0, 2), 16);  //把十六进制形式的字串符串转换为二进制字节  
                byteArr[j] = Convert.ToByte(strArr[i].Substring(2, 2), 16);
            }
            str = System.Text.Encoding.Unicode.GetString(byteArr);　//把字节转为unicode编码  
            return str;

        } 

        public Form1()
        {
            InitializeComponent();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            //{func:'setReadPLCStatus',commandText:'读取PLC参数',data:null}
            string data = "{\"func\":\"setReadPLCStatus\",\"commandText\":\"" + escape("读取PLC参数") + "\",\"data\":null}";

            isRun = true;
            thread = new Thread(new ParameterizedThreadStart(StartReadState));
            thread.Start(data);
        }

        void StartReadState(object postData)
        {

            while (isRun)
            {
                WebRequest wRequest = WebRequest.Create(url);
                wRequest.Method = "POST";
                wRequest.ContentType = "application/json";
                using (StreamWriter writer = new StreamWriter(wRequest.GetRequestStream()))
                {
                    writer.Write(postData);
                }
                WebResponse wResponse = wRequest.GetResponse();
                Stream stream = wResponse.GetResponseStream();
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.Default);
                string r = reader.ReadToEnd();   //url返回的值  
                richTextBox1.AppendText(r + "\r\n");
                Thread.Sleep(2000);
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            isRun = false;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Form.CheckForIllegalCrossThreadCalls = false;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            WebRequest wRequest = WebRequest.Create(url);
            wRequest.Method = "POST";
            wRequest.ContentType = "application/json";
            string data = "{\"func\":\"loadBrightnessLevel\",\"commandText\":\"" + escape("读取亮度级别") + "\",\"data\":null}";
            using (StreamWriter writer = new StreamWriter(wRequest.GetRequestStream()))
            {
                writer.Write(data);
            }
            WebResponse wResponse = wRequest.GetResponse();
            Stream stream = wResponse.GetResponseStream();
            StreamReader reader = new StreamReader(stream, System.Text.Encoding.Default);
            string r = reader.ReadToEnd();   //url返回的值  
            richTextBox1.AppendText(r + "\r\n");
            //Thread.Sleep(2000);
        }
    }
}
