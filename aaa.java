class Programa
{

 public static void main (String entrada[])
{
    int n1, n2;
    int div;
    double pot;
    String msg = "";

//entrada de dados
n1 = Integer.parseInt(entrada[0]);
n2 = Integer.parseInt(entrada[1]);


//processamento
div = (int)n1 / (int)n2;
pot = Math.pow(n1, n2);

//saida de resultado
msg = "n1 =" + n1 + "      n2 = " + n2 + "\n";
msg = msg + "quociente da divisao de n1 por n2 =" + div + "\n";
msg = msg + "potencia de n1 e n2 = " + pot + "\n" + entrada[1];

System.out.println(msg);
System.exit(0);

}
}