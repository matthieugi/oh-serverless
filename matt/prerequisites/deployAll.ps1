$region = "westeurope";

$resourceGroupName = "openhack-serverless"
$deploymentName = "azuredeploy" + "-" + (Get-Date).ToUniversalTime().ToString('MMdd-HHmmss')
Write-Host("Now deploying RG to " + $resourceGroupName);

$rg = Get-AzResourceGroup -Name $resourceGroupName
if ($rg.Name -ne '')
{
    Write-Host("Now deploying template " + $rg.Name + " with deploymentname: " + $deploymentName);

    New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateFile './azuredeploy.json' -Name $deploymentName -Verbose 

    Write-Host("Deployment Completed for " + $resourceGroupName);
}
else {
    Write-Host("Deployment failed for " + $resourceGroupName);
}

#ensure that the subscription has the event-grid registration applied
Register-AzResourceProvider -ProviderNamespace Microsoft.EventGrid  