terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-north-1"
}

resource "aws_security_group" "haha_sg" {
  name        = "haha_sg_http_and_ssh"
  description = "haha default sg"
  tags = {
    Name = "haha_sg"
  }
}
resource "aws_vpc_security_group_ingress_rule" "haha_sg_in1" {
  security_group_id = aws_security_group.haha_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}
resource "aws_vpc_security_group_ingress_rule" "haha_sg_in2" {
  security_group_id = aws_security_group.haha_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}
resource "aws_vpc_security_group_egress_rule" "haha_sg_eg1" {
  security_group_id = aws_security_group.haha_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_key_pair" "haha_kp" {
  key_name   = "haha_key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCJiqPVlJNaay0oYe+shlGhHqJl3yy3KAwTbPZO6aFT2+AhitWlmfwiFeL3JKS7Aw4CFiJUrTF6tSP+v6z5jo/2xgGfNVRtpdiF6TuWR69Q0hQhjMnp1R02X29WL1zfOmZQLlCxejuNS7dps/8gM9YByLw8A4w61Kw5mYzaJXb5HUyjikSxxGDyZMO6xgKc7usW9XTXGbOZL+M9khqZKeyMw2xjdsN+XFFkxevfBsoNxkDUmJ5WpHdfDieFUzVIAYNYtM4RnS1ALXBZ09Ir7OgdN1vy11hlHcbPa86IKu55BPCYmGc56HrI3IWlkKd9HQyExM0zYn82AdLtpL2H7yux"
}

resource "aws_instance" "haha_instance" {
  ami                    = "ami-0014ce3e52359afbd"
  instance_type          = "t3.micro"
  key_name               = "haha_key"
  vpc_security_group_ids = [aws_security_group.haha_sg.id]

  tags = {
    Name = "hahaInstance"
  }
}
